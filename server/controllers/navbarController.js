import Navbar from "../models/Navbar.js";

/* 🌍 PUBLIC */
export const getPublicNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findOne();
    res.json(navbar);
  } catch (err) {
    console.error("Public Navbar Error:", err);
    res.status(500).json({ message: "Failed to fetch navbar" });
  }
};

/* 🔐 ADMIN */
export const getAdminNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findOne();
    res.json(navbar);
  } catch (err) {
    console.error("Admin Navbar Error:", err);
    res.status(500).json({ message: "Failed to fetch navbar" });
  }
};

/* ✏️ CREATE OR UPDATE */
export const createOrUpdateNavbar = async (req, res) => {
  try {
    const { phone, menu } = req.body;

    if (!phone || !menu) {
      return res.status(400).json({
        message: "Phone and Menu are required",
      });
    }

    let navbar = await Navbar.findOne();

    const data = {
      phone,
      menu, // ✅ NO JSON.parse (menu already array)
    };

    if (navbar) {
      navbar = await Navbar.findByIdAndUpdate(
        navbar._id,
        data,
        { new: true }
      );
    } else {
      navbar = await Navbar.create(data);
    }

    res.status(200).json({
      success: true,
      message: "Navbar saved successfully",
      navbar,
    });

  } catch (err) {
    console.error("Navbar Update Error:", err);
    res.status(500).json({
      message: "Navbar update failed",
      error: err.message,
    });
  }
};
