import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import UploadSection from "../components/UploadSection";
import DetectionButtons from "../components/DetectionButtons";
import DetectionResults from "../components/DetectionResults";
import PatientForm from "../components/PatientForm";

import {
  detectLesions,
  createPatientWithLesions,
} from "../store/patientsSlice";

import uploadToCloudinary from "../lib/uploadToCloudinary";

const lesionTypes = [
  { id: "streaks", name: "Streaks", color: "from-red-500 to-orange-500" },
  { id: "globules", name: "Globules", color: "from-blue-500 to-cyan-500" },
  { id: "miliaLikeCysts", name: "Milia-like Cysts", color: "from-yellow-500 to-amber-500" },
  { id: "pigmentNetwork", name: "Pigment Network", color: "from-green-500 to-emerald-500" },
  { id: "negativeNetwork", name: "Negative Network", color: "from-purple-500 to-pink-500" },
];

const ScanLesion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");
  const [detectionResults, setDetectionResults] = useState({});
  const [isDetecting, setIsDetecting] = useState(false);

  // console.log(user._id);
  
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    contact: "",
    gender: "",
  });

  // ---------------- Handle Image Upload ----------------
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    try {
      const url = await uploadToCloudinary(file);
      setCloudinaryURL(url);
    } catch (err) {
      toast.error("Cloudinary upload failed");
    }
  };

  // ---------------- Detection Single ----------------
  const detectSingle = async (lesionId) => {
    if (!cloudinaryURL) return toast.error("Please upload an image first");

    setIsDetecting(true);

    try {
      const result = await dispatch(
        detectLesions({ imageURL: cloudinaryURL, types: lesionId })
      );

      const backend = result.payload;

      setDetectionResults((prev) => ({
        ...prev,
        [lesionId]: {
          ...backend[lesionId],
          mask: backend[lesionId]?.maskImage,
          labeled: backend[lesionId]?.labeledImage,
          heatmap: backend[lesionId]?.heatmapImage,
        },
      }));
    } catch (err) {
      toast.error("Detection failed");
    } finally {
      setIsDetecting(false);
    }
  };

  // ---------------- Detect All ----------------
  const detectAll = async () => {
    if (!cloudinaryURL) return toast.error("Please upload an image first");

    setIsDetecting(true);

    try {
      const result = await dispatch(
        detectLesions({ imageURL: cloudinaryURL, types: "all" })
      );

      const backend = result.payload;
      const formatted = {};

      for (const type of lesionTypes) {
        const id = type.id;
        if (backend[id]) {
          formatted[id] = {
            ...backend[id],
            mask: backend[id].maskImage,
            labeled: backend[id].labeledImage,
            heatmap: backend[id].heatmapImage,
          };
        }
      }

      setDetectionResults(formatted);
    } catch (err) {
      toast.error("Detection failed");
    } finally {
      setIsDetecting(false);
    }
  };

  // ---------------- Save Report ----------------
  const handleSaveReport = async () => {
    if (!patientData.name || !patientData.age || !patientData.gender)
      return toast.error("Please fill all patient details");

    if (!Object.keys(detectionResults).length)
      return toast.error("Please detect at least one lesion");

    const payload = {
      userID: user._id,
      patientName: patientData.name,
      patientPhone: patientData.contact,
      patientAge: Number(patientData.age),
      patientGender: patientData.gender,
      patientLesionImage: cloudinaryURL,
      lesions: detectionResults,
    };

    try {
      const res = await dispatch(createPatientWithLesions(payload));
      const saved = res.payload;

      toast.success("Report saved");
      navigate(`/view-report/${saved._id}`);
    } catch (err) {
      toast.error("Failed to save report");
    }
  };

  return (
    <div className="min-h-screen bg-light py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-3 md:mb-4">AI-Powered Skin Lesion Detection</h1>
           <p className="text-base md:text-lg text-primary max-w-2xl mx-auto px-4">
             Upload a clear image of the skin area for advanced AI analysis
           </p>
         </div>
        <UploadSection imagePreview={imagePreview} onChangeFile={handleImageUpload} />

        <DetectionButtons
          imagePreview={imagePreview}
          lesionTypes={lesionTypes}
          onDetect={detectSingle}
          onDetectAll={detectAll}
          isDetecting={isDetecting}
        />

        <DetectionResults lesionTypes={lesionTypes} detectionResults={detectionResults} />

        <PatientForm
          patientData={patientData}
          onChange={(e) =>
            setPatientData({ ...patientData, [e.target.name]: e.target.value })
          }
          onSaveReport={handleSaveReport}
        />
      </div>
    </div>
  );
};

export default ScanLesion;
