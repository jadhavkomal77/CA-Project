import express from "express";
import {
  getPublicTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/testimonialController.js";

import upload from "../utils/upload.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

/* PUBLIC */
router.get("/public", getPublicTestimonials);

/* ADMIN */
router.get("/", adminAuth, getAdminTestimonials);

router.post(
 "/",
 adminAuth,
 upload.single("image"),
 createTestimonial
);

router.put(
 "/:id",
 adminAuth,
 upload.single("image"),
 updateTestimonial
);

router.delete("/:id", adminAuth, deleteTestimonial);

export default router;