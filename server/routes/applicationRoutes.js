
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



//  *************************


// import express from "express";
// import {
//   submitApplication,
//   getAllApplications,
//   getApplicationById,
//   updateApplicationStatus,
//   generateAndUploadPDF,
//   deleteApplication,
  
// } from "../controllers/applicationController.js";

// import upload from "../utils/applicationUpload.js";
// import { downloadApplicationPDF } from "../controllers/applicationPdfController.js";
// import adminAuth from "../middlewares/adminAuth.js";

// const router = express.Router();

// router.post(
//   "/",
//   upload.fields([{ name: "documents" }]),
//   submitApplication
// );

// router.get("/admin", adminAuth, getAllApplications);

// router.get("/admin/:id", adminAuth, getApplicationById);

// router.put("/admin/:id/status", adminAuth, updateApplicationStatus);

// router.post("/admin/:id/generate-pdf", adminAuth, generateAndUploadPDF);

// router.delete("/admin/:id", adminAuth, deleteApplication);


// router.get("/admin/:id/download", adminAuth, downloadApplicationPDF);

// export default router;




// *************


// import express from "express";
// import {
//   submitApplication,
//   getAllApplications,
//   getApplicationById,
//   updateApplicationStatus,
//   generateAndUploadPDF,
//   deleteApplication,
// } from "../controllers/applicationController.js";

// import upload from "../utils/applicationUpload.js";
// import adminAuth from "../middlewares/adminAuth.js";
// import Application from "../models/Application.js";
// import generatePDFBuffer from "../utils/generatePDF.js";

// const router = express.Router();

// /* ================= USER ROUTE ================= */

// router.post(
//   "/",
//   upload.fields([{ name: "documents" }]),
//   submitApplication
// );

// /* ================= ADMIN ROUTES ================= */

// router.get("/admin", adminAuth, getAllApplications);

// router.get("/admin/:id", adminAuth, getApplicationById);

// router.put("/admin/:id/status", adminAuth, updateApplicationStatus);

// router.post("/admin/:id/generate-pdf", adminAuth, generateAndUploadPDF);

// router.delete("/admin/:id", adminAuth, deleteApplication);

// /* ================= PDF DOWNLOAD ================= */

// router.get("/admin/:id/download", adminAuth, async (req, res) => {
//   const app = await Application.findById(req.params.id);

//   if (!app || !app.pdfUrl) {
//     return res.status(404).json({ message: "PDF not found" });
//   }

//   const axios = (await import("axios")).default;

//   const response = await axios.get(app.pdfUrl, {
//     responseType: "arraybuffer",
//   });

//   const filename = `Application-${app.userDetails?.name || "User"}-${app._id}.pdf`;

//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename="${filename}"`
//   );

//   res.send(response.data);
// });

// export default router;