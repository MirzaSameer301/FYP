const mongoose = require("mongoose");

// Reusable lesion structure
const lesionInfoSchema = new mongoose.Schema(
  {
    status: { type: Boolean, default: false },
    confidence: { type: Number, min: 0, max: 100, default: 0 },

    // THREE images returned from ML model
    maskImage: { type: String, default: null },      
    labeledImage: { type: String, default: null },    
    heatmapImage: { type: String, default: null },    
  },
  { _id: false }
);

const patientSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientName: { type: String, required: true, minlength: 2 },
    patientPhone: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientGender: { type: String, required: true, enum: ["Male", "Female", "Other"] },

    // original uploaded image
    patientLesionImage: { type: String, required: true },

    lesions: {
      streaks: { type: lesionInfoSchema, default: () => ({}) },
      globules: { type: lesionInfoSchema, default: () => ({}) },
      pigmentNetwork: { type: lesionInfoSchema, default: () => ({}) },
      negativeNetwork: { type: lesionInfoSchema, default: () => ({}) },
      miliaLikeCysts: { type: lesionInfoSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
