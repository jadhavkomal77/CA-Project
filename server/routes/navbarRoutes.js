import express from "express";
import { createOrUpdateNavbar, getAdminNavbar, getPublicNavbar } from "../controllers/navbarController.js";
import adminAuth from "../middlewares/adminAuth.js";


const router = express.Router();

/* 🌍 Public */
router.get("/public", getPublicNavbar);

/* 🔐 Admin */
router.get("/", adminAuth, getAdminNavbar);
router.put("/", adminAuth, createOrUpdateNavbar);


export default router;
