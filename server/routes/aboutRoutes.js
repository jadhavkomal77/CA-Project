// // routes/aboutRoutes.js
// import express from "express";
// import {
//   getAdminAbout,
//   getPublicAbout,
//   saveAbout,
// } from "../controllers/adminAboutController.js";
// import adminAuth from "../middlewares/adminAuth.js";
// import upload from "../utils/upload.js";

// const router = express.Router();

// /* 🌍 Public */
// router.get("/public", getPublicAbout);

// /* 🔐 Admin */
// router.get("/", adminAuth, getAdminAbout);
// // router.put("/", adminAuth, upload.single("image"), saveAbout);
// router.put(
//   "/",adminAuth, upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "teamPhotos", maxCount: 10 }, 
//   ]),
//   saveAbout
// );

// export default router;




import express from "express";
import {
  getAdminAbout,
  getPublicAbout,
  saveAbout,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/adminAboutController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../utils/upload.js";

const router = express.Router();

/* Public */
router.get("/public", getPublicAbout);

/* Admin */
router.get("/", adminAuth, getAdminAbout);

router.put(
  "/",
  adminAuth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  saveAbout
);

router.post(
  "/team",
  adminAuth,
  upload.single("photo"),
  addTeamMember
);

router.put(
  "/team/:id",
  adminAuth,
  upload.single("photo"),
  updateTeamMember
);

router.delete("/team/:id", adminAuth, deleteTeamMember);

export default router;