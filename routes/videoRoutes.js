const express = require("express");
const router = express.Router();
const { uploadBinaryVideo } = require("../controllers/videoController");

router.post("/videoupload", uploadBinaryVideo);

module.exports = router;
