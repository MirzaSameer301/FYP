// src/utils/uploadToCloudinary.js
import axios from "axios";

const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // 🔹 Replace these with your real values
    formData.append("upload_preset", "skin_lesions");
    formData.append("cloud_name", "dlaphjffq");

    const cloudName = "dlaphjffq"; // update this

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (!response.data.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export default uploadToCloudinary;
