import express from "express";
import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/aboutTeam.controller.js";
import adminAuth from "../middlewares/adminAuth.js";


const router = express.Router();

// Public Route
router.get("/", getTeamMembers);

// Protected Admin Routes
router.post("/", adminAuth, addTeamMember);
router.put("/:id", adminAuth, updateTeamMember);
router.delete("/:id", adminAuth, deleteTeamMember);

export default router;