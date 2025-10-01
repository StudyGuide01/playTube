import multer from "multer";
import path from "path";
import fs from "fs";

// Temporary folder for uploaded chunks
const tempDir = path.join(process.cwd(), "uploads");

// Ensure folder exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // User-specific folder inside uploads
    const userFolder = path.join(tempDir, req.id.toString());
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }
    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    const { videoId, chunkIndex } = req.body;
    // Save chunk as videoId_chunkIndex.ext
    const ext = path.extname(file.originalname);
    cb(null, `${videoId}_chunk${chunkIndex}${ext}`);
  },
});

const uploadVideoChunk = multer({ storage });

export default uploadVideoChunk;
