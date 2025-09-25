import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // Save files in public folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save file with original name
  },
});

const upload = multer({ storage });

export default upload;
