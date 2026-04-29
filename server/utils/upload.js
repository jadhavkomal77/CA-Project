
import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fn = crypto.randomUUID() + ext;
    cb(null, fn);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024, 
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, png, webp allowed"));
    }
  },
});

export default upload;