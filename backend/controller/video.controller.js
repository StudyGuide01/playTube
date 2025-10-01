import fs from "fs";
import path from "path";
import uploadOnCloudinary from "../config/cloudinary.js";
import VideoModel from "../model/video.model.js";
// import uploadOnCloudinary from "../config/cloudinary.js";
// import VideoModel from "../models/video.model.js";

const tempDir = path.join(process.cwd(), "uploads");

export const uploadVideo = async (req, res) => {
  try {
    const userId = req.id; // From isAuth middleware
    const { videoId, chunkIndex, totalChunks, title, description } = req.body;

    // file already saved by multer
    console.log("Chunk received:", chunkIndex, "of", totalChunks);

    // Agar last chunk hai, merge process start karenge
    if (parseInt(chunkIndex) + 1 === parseInt(totalChunks)) {
      const userFolder = path.join(tempDir, userId.toString());
      const chunks = [];

      for (let i = 0; i < totalChunks; i++) {
        const files = fs.readdirSync(userFolder);
        const chunkFile = files.find((f) => f.includes(`${videoId}_chunk${i}`));
        chunks.push(path.join(userFolder, chunkFile));
      }

      // Merge chunks
      const mergedPath = path.join(userFolder, `${videoId}_merged.mp4`);
      const writeStream = fs.createWriteStream(mergedPath);

      for (const chunkPath of chunks) {
        const data = fs.readFileSync(chunkPath);
        writeStream.write(data);
        fs.unlinkSync(chunkPath); // delete chunk after writing
      }

      writeStream.end();

      // Upload merged video to Cloudinary
      const videoUrl = await uploadOnCloudinary(mergedPath);

      // Delete merged local file
      fs.unlinkSync(mergedPath);

      // Create Video document in DB
      const videoDoc = await VideoModel.create({
        channel: userId, // assuming channel = userId for now
        title,
        description,
        videoUrl,
        thumbnail: "", // Thumbnail upload later
      });

      return res.status(200).json({ message: "Video uploaded successfully", video: videoDoc });
    }

    res.status(200).json({ message: `Chunk ${chunkIndex} uploaded successfully` });
  } catch (error) {
    console.log("Error uploading video:", error);
    res.status(500).json({ message: "Error uploading video" });
  }
};
