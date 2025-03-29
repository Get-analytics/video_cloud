const path = require("path");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");

// Controller to Handle Binary Video Upload
const uploadBinaryVideo = async (req, res) => {
  try {
    // Generate a unique ID for folder
    const uniqueId = uuidv4();
    const uploadDir = path.join(__dirname, "../uploads/videos", uniqueId);

    // Create folder if it doesn't exist
    await fs.ensureDir(uploadDir);

    // Define video file path
    const videoFilePath = path.join(uploadDir, "uploaded_video.mp4");

    // Create a writable stream
    const writeStream = fs.createWriteStream(videoFilePath);

    // Pipe the incoming video data to the file
    req.pipe(writeStream);

    // Close stream when upload is complete
    writeStream.on("finish", () => {
      console.log("Video uploaded successfully");
      res.status(200).json({
        message: "Video uploaded successfully",
        videoId: uniqueId,
        filePath: `/uploads/videos/${uniqueId}/uploaded_video.mp4`,
      });
    });

    // Error handling
    writeStream.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(500).json({ message: "Failed to upload video", error: error.message });
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading video", error: error.message });
  }
};

module.exports = { uploadBinaryVideo };
