
// import express from "express";
// import * as ctrl from "../controllers/applicationController.js";
// import adminAuth from "../middlewares/adminAuth.js";
// import upload from "../utils/applicationUpload.js";

// const router = express.Router();


// router.post(
//   "/",
//   upload.fields([{ name: "documents" }]),
//   ctrl.submitApplication
// );


// router.get("/admin", adminAuth, ctrl.getAllApplications);

// /* single application */
// router.get("/admin/:id", adminAuth, ctrl.getApplicationById);

// /* update status */
// router.put("/admin/:id/status", adminAuth, ctrl.updateApplicationStatus);

// /* generate PDF (Cloudinary upload) */
// router.post("/admin/:id/generate-pdf", adminAuth, ctrl.generateAndUploadPDF);

// /* delete application */
// router.delete("/admin/:id", adminAuth, ctrl.deleteApplication);


// export default router;












import express from "express";
import * as ctrl from "../controllers/applicationController.js";
import { downloadApplicationPDF } from "../controllers/applicationPdfController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../utils/applicationUpload.js";

const router = express.Router();

/* USER */
router.post("/", upload.fields([{ name: "documents" }]), ctrl.submitApplication);

/* ADMIN */
router.get("/admin", adminAuth, ctrl.getAllApplications);
router.get("/admin/:id", adminAuth, ctrl.getApplicationById);
router.put("/admin/:id/status", adminAuth, ctrl.updateApplicationStatus);
router.delete("/admin/:id", adminAuth, ctrl.deleteApplication);
router.get("/admin/:id/pdf", adminAuth, downloadApplicationPDF);

export default router;