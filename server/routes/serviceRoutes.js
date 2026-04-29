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


router.post("/", upload.array("projectImages",10), createService);


router.get("/admin", getAdminServices);          
router.get("/public/:slug", getPublicServiceBySlug);
router.get("/", getPublicServices);            
router.get("/:slug", getServiceBySlug);          

router.put("/:id", upload.array("projectImages",10), updateService);


router.delete("/:id", deleteService);

export default router;




