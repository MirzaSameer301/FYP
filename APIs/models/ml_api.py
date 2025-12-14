import gc
import base64
import time
import requests
import numpy as np
import cv2
import tensorflow as tf

from tensorflow.keras.models import load_model
from tensorflow.keras import backend as K

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

import cloudinary
import cloudinary.uploader
import matplotlib.cm as cm  # for heatmap generation

# ===========================
# CONFIG
# ===========================
IMG_H = 256
IMG_W = 256

MODEL_PATHS = {
    "globules": "globules_model.keras",
    "streaks": "streaks_model.keras",
    "pigment": "pigmentN_model.keras",
    "negative": "negative_model.keras",
    "milia": "milia_like_model.keras"
}

# Configure Cloudinary
cloudinary.config(
    cloud_name="dlaphjffq",
    api_key="588131237555119",
    api_secret="WCvlr9444MkRMkJHdw8HE-N4eCY"
)

# ===========================
# CUSTOM LOSS
# ===========================
def hybrid_loss(y_true, y_pred):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    smooth = 1e-6

    tp = K.sum(y_true_f * y_pred_f)
    fp = K.sum((1 - y_true_f) * y_pred_f)
    fn = K.sum(y_true_f * (1 - y_pred_f))

    tversky = (tp + smooth) / (tp + 0.7 * fp + 0.3 * fn + smooth)
    focal_tversky = K.pow((1 - tversky), 0.75)

    intersection = K.sum(y_true_f * y_pred_f)
    union = K.sum(y_true_f + y_pred_f - y_true_f * y_pred_f)
    iou = (intersection + smooth) / (union + smooth)

    return focal_tversky + (1 - iou)


# ===========================
# HEATMAP FUNCTION
# ===========================
def generate_blue_background_heatmap(raw_pred):
    """
    Takes raw prediction (H x W, values 0–1) and returns:
    - blurred_norm: smoothed probability map (0–1)
    - heatmap_rgb: uint8 RGB image with jet colormap
    """
    pred = raw_pred.astype(np.float32)

    # Smooth prediction
    pred_255 = (pred * 255).astype(np.uint8)
    blurred_255 = cv2.GaussianBlur(pred_255, (21, 21), 0)
    blurred_norm = blurred_255.astype(np.float32) / 255.0

    # Apply jet colormap
    heatmap_rgba = cm.jet(blurred_norm)  # RGBA in [0, 1]
    heatmap_rgb = (heatmap_rgba[..., :3] * 255).astype(np.uint8)

    return blurred_norm, heatmap_rgb


# ===========================
# MODEL LOADER (PER REQUEST)
# ===========================
def load_temp_model(model_key: str):
    if model_key not in MODEL_PATHS:
        raise HTTPException(status_code=400, detail=f"Unknown model key: {model_key}")

    path = MODEL_PATHS[model_key]

    try:
        model = load_model(
            path,
            custom_objects={
                "hybrid_loss": hybrid_loss,
                "MeanIoU": tf.keras.metrics.MeanIoU(num_classes=2)
            }
        )
        return model
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading {model_key} model: {e}")


# ===========================
# FASTAPI SETUP
# ===========================
app = FastAPI()


class ImageRequest(BaseModel):
    image: str  # Image URL (Cloudinary or any HTTP URL)


# ===========================
# CLOUDINARY UPLOADER
# ===========================
def upload_to_cloudinary(image_array: np.ndarray, filename_base: str) -> str:
    """
    Encodes an image array as JPEG and uploads to Cloudinary.
    image_array must be BGR (for color) or single-channel.
    """
    success, buffer = cv2.imencode(".jpg", image_array)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to encode image for upload.")

    file_bytes = base64.b64encode(buffer).decode("utf-8")

    ts = int(time.time())
    public_id = f"{filename_base}_{ts}"

    upload = cloudinary.uploader.upload(
        f"data:image/jpeg;base64,{file_bytes}",
        folder="lesion_results",
        public_id=public_id,
        overwrite=True,
        invalidate=True,
        resource_type="image",
    )
    return upload.get("secure_url")


# ===========================
# MAIN INFERENCE FUNCTION
# ===========================
def run_inference(image_url: str, model_key: str):
    # 1) Load model JUST for this request
    model = load_temp_model(model_key)

    # 2) Load image from URL
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        img_array = np.asarray(bytearray(response.content), dtype=np.uint8)
        img_bgr = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    except Exception as e:
        del model
        tf.keras.backend.clear_session()
        gc.collect()
        raise HTTPException(status_code=400, detail=f"Image cannot be loaded: {e}")

    if img_bgr is None:
        del model
        tf.keras.backend.clear_session()
        gc.collect()
        raise HTTPException(status_code=400, detail="Invalid image file.")

    # 3) Preprocess for model
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    resized_rgb = cv2.resize(img_rgb, (IMG_W, IMG_H))
    x = resized_rgb / 255.0
    x = np.expand_dims(x, axis=0)

    # 4) Predict
    prediction = model.predict(x, verbose=0)[0]  # (256, 256, 1)
    prediction_2d = np.squeeze(prediction)       # (256, 256)

    # 5) Clear model
    del model
    tf.keras.backend.clear_session()
    gc.collect()

    # 6) Binary mask & detected area
    mask_2d = (prediction_2d > 0.5).astype(np.uint8)     # 0/1
    mask_for_upload = (mask_2d * 255).astype(np.uint8)   # 0/255
    detected_area = (np.sum(mask_2d > 0) / (IMG_W * IMG_H)) * 100.0

    # ===========================
    # 7) Labeled image:
    #    map mask onto image (filled region) + draw ALL boundaries
    # ===========================
    # Find ALL contours (outer + inner holes)
    contours, _ = cv2.findContours(mask_2d, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Base = original resized lesion (RGB)
    base_rgb = resized_rgb.copy()

    # Create green overlay wherever mask == 1
    overlay_rgb = np.zeros_like(base_rgb)
    # overlay_rgb[mask_2d == 1] = [0, 255, 0]  # green in RGB

    # Blend overlay with base image
    labeled_rgb = cv2.addWeighted(base_rgb, 0.7, overlay_rgb, 0.3, 0.0)

    # Draw contour lines on top (for sharp boundary)
    labeled_bgr = cv2.cvtColor(labeled_rgb, cv2.COLOR_RGB2BGR)
    cv2.drawContours(labeled_bgr, contours, -1, (0, 255, 0), 2)

    # ===========================
    # 8) Heatmap (still separate)
    # ===========================
    _, heat_rgb = generate_blue_background_heatmap(prediction_2d)
    heat_bgr = cv2.cvtColor(heat_rgb, cv2.COLOR_RGB2BGR)

    # 9) Upload all results
    mask_url = upload_to_cloudinary(mask_for_upload, f"{model_key}_mask")
    labeled_url = upload_to_cloudinary(labeled_bgr, f"{model_key}_labeled")
    heatmap_url = upload_to_cloudinary(heat_bgr, f"{model_key}_heatmap")

    return {
        "lesion_type": model_key,
        "status": bool(detected_area > 0),
        "confidence": float(round(detected_area, 2)),
        "mask_url": mask_url,
        "labeled_url": labeled_url,
        "heatmap_url": heatmap_url,
    }


# ===========================
# ROUTES FOR LESIONS
# ===========================
@app.post("/globules")
def detect_globules(req: ImageRequest):
    return run_inference(req.image, "globules")


@app.post("/streaks")
def detect_streaks(req: ImageRequest):
    return run_inference(req.image, "streaks")


@app.post("/pigment")
def detect_pigment(req: ImageRequest):
    return run_inference(req.image, "pigment")


@app.post("/negative")
def detect_negative(req: ImageRequest):
    return run_inference(req.image, "negative")


@app.post("/milia")
def detect_milia(req: ImageRequest):
    return run_inference(req.image, "milia")


# ===========================
# START SERVER
# ===========================
if __name__ == "__main__":
    uvicorn.run("ml_api:app", host="0.0.0.0", port=8000, reload=True)
