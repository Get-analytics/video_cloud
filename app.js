const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs-extra");
const videoRoutes = require("./routes/videoRoutes");

// Ensure uploads directory exists
fs.ensureDirSync(path.join(__dirname, "uploads/videos"));

// Middleware
app.use(express.json());
app.use("/api", videoRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
