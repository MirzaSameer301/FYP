const express = require("express");
const router = express.Router();

const {
  createPatientWithLesions,
  getPatients,
  updatePatient,
  deletePatient,
  getPatientById,
} = require("../controllers/patientController.js");

router.post("/create", createPatientWithLesions);

router.get("/:userID", getPatients);

router.get("/getPatient/:id", getPatientById);

router.delete("/:id", deletePatient);

module.exports = router;
