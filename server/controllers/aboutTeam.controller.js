
import fs from "fs";
import upload from "../utils/upload.js";
import cloudinary from "../utils/cloudinary.js";
import AboutTeam from "../models/AboutTeam.js";

export const addAboutTeam = (req, res) => {
  upload.single("img")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    try {
      const { name, role } = req.body;

      if (!name) {
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "about_team",
      });

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      const data = await AboutTeam.create({
        name,
        role: role || "",
        img: {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        },
      });

      res.status(201).json({
        success: true,
        message: "About team member added successfully",
        data,
      });
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  });
};

export const getAboutTeam = async (req, res) => {
  try {
    const data = await AboutTeam.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getAboutTeamById = async (req, res) => {
  try {
    const data = await AboutTeam.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const updateAboutTeam = (req, res) => {
  upload.single("img")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    try {
      const { name, role } = req.body;

      const data = await AboutTeam.findById(req.params.id);

      if (!data) {
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }

      data.name = name || data.name;
      data.role = role !== undefined ? role : data.role;

      if (req.file) {
        if (data.img?.public_id) {
          await cloudinary.uploader.destroy(data.img.public_id);
        }

        const uploaded = await cloudinary.uploader.upload(req.file.path, {
          folder: "about_team",
        });

        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        data.img = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };
      }

      await data.save();

      res.status(200).json({
        success: true,
        message: "About team updated successfully",
        data,
      });
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  });
};

export const deleteAboutTeam = async (req, res) => {
  try {
    const data = await AboutTeam.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    if (data.img?.public_id) {
      await cloudinary.uploader.destroy(data.img.public_id);
    }

    await AboutTeam.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "About team deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};