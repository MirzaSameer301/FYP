const Patient = require("../models/patientModel.js");

exports.createPatientWithLesions = async (req, res) => {
  try {
    const {
      userID,
      patientName,
      patientPhone,
      patientAge,
      patientGender,
      patientLesionImage,
      lesions,
    } = req.body;

    const patient = await Patient.create({
      userID,
      patientName,
      patientPhone,
      patientAge,
      patientGender,
      patientLesionImage,
      lesions,
    });

    res.status(201).json({
      success: true,
      message: "Patient record created successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.error("Error creating patient with lesions:", error);
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ userID: req.params.userID }).sort({
      createdAt: -1,
    });

    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id); 
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    } 
    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: "Patient updated", patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Patient deleted"});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
