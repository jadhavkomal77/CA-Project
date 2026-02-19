import express from "express";
import {
  createService,
  getPublicServices,
  getAdminServices,
  getServiceBySlug,
  updateService,
  deleteService,
  getPublicServiceBySlug,
} from "../controllers/adminServiceController.js";
import upload from "../utils/upload.js";

const router = express.Router();

// router.post(
//   "/",
//   upload.fields([{ name: "projects", maxCount: 10 }]),
//   createService
// );
router.post("/", upload.array("projectImages",10), createService);


router.get("/admin", getAdminServices);          // 🔐 admin first
router.get("/public/:slug", getPublicServiceBySlug); // 🌍 public single
router.get("/", getPublicServices);              // 🌍 public list
router.get("/:slug", getServiceBySlug);          // admin single

router.put("/:id", upload.array("projectImages",10), updateService);
// router.put(
//   "/:id",
//   upload.fields([{ name: "projects", maxCount: 10 }]),
//   updateService
// );

router.delete("/:id", deleteService);

export default router;




