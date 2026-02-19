import express from "express";
import {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";
import adminAuth from "../middlewares/adminAuth.js";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { downloadApplicationPDF } from "../controllers/applicationPdfController.js";

const router = express.Router();   // ✅ MISSING LINE — ADD THIS

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/applications/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fn = crypto.randomUUID() + ext;
    cb(null, fn);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, PNG, PDF allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});


// PUBLIC
router.post("/", upload.array("documents", 20), submitApplication);



// ADMIN
router.get("/admin", adminAuth, getAllApplications);
router.get("/admin/:id", adminAuth, getApplicationById);
router.put("/admin/:id/status", adminAuth, updateApplicationStatus);
router.delete("/admin/:id", adminAuth, deleteApplication);

router.get("/admin/:id/pdf", adminAuth, downloadApplicationPDF);



export default router;
