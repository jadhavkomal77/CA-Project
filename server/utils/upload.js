

// import multer from "multer";
// import path from "path";
// import crypto from "crypto";

// const profileStorage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const fn = crypto.randomUUID() + ext;
//     cb(null, fn);
//   },
// });

// const upload = multer({ storage: profileStorage });

// export default upload;


import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

/* =========================
   FOLDER AUTO CREATE
========================= */
const uploadPath = "uploads/applications";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* =========================
   STORAGE CONFIG
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = crypto.randomUUID() + ext;
    cb(null, uniqueName);
  },
});

/* =========================
   FILE FILTER (UPDATED)
========================= */
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF, JPG, PNG, WEBP files allowed"),
      false
    );
  }
};

/* =========================
   UPLOAD INSTANCE
========================= */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export default upload;
