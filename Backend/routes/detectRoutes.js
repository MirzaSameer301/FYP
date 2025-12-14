const express = require("express");
const router = express.Router();

const { runDetection } = require("../controllers/detectController.js");

router.post("/", runDetection);

module.exports = router;
