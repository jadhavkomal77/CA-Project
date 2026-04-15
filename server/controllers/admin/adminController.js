
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import Admin from "../../models/admin/Admin.js";
import upload from "../../utils/upload.js";
import cloudinary from "../../utils/cloudinary.js";
import { sendEmail } from "../../utils/sendEmail.js";

const JWT_SECRET = process.env.JWT_KEY;

/* ================= COOKIE ================= */

const cookieOptions =
  process.env.NODE_ENV === "production"
    ? { httpOnly: true, sameSite: "none", secure: true }
    : { httpOnly: true, sameSite: "lax", secure: false };

/* ================= REGISTER ================= */

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Admin.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Account disabled" });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("adminToken", token, cookieOptions);

    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ================= LOGOUT ================= */

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", cookieOptions);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch {
    res.status(500).json({ message: "Logout error" });
  }
};

/* ================= PROFILE ================= */

// export const getAdminProfile = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.user.id).select("-password");

//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     res.json({
//       success: true,
//       admin,
//     });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getAdminProfile = async (req, res) => {
  try {

    const admin = await Admin.findById(req.user.id)
      .select("-password -resetOTP -resetOTPExpire -resetOTPVerified -otpAttempts");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      success: true,
      admin,
    });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE PROFILE ================= */

// export const updateAdminProfile = (req, res) => {
//   upload.single("profileImage")(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: "Image upload failed" });
//     }

//     try {
//       const admin = await Admin.findById(req.user.id);

//       if (!admin) {
//         return res.status(404).json({ message: "Admin not found" });
//       }

//       const { name, phone } = req.body;

//       if (req.file) {
//         if (admin.profile?.public_id) {
//           await cloudinary.uploader.destroy(admin.profile.public_id);
//         }

//         const uploaded = await cloudinary.uploader.upload(req.file.path, {
//           folder: "admin_profiles",
//         });

//         admin.profile = {
//           url: uploaded.secure_url,
//           public_id: uploaded.public_id,
//         };

//         fs.unlinkSync(req.file.path);
//       }

//       admin.name = name || admin.name;
//       admin.phone = phone || admin.phone;

//       await admin.save();

//       res.json({
//         success: true,
//         message: "Profile updated",
//         admin,
//       });
//     } catch {
//       res.status(500).json({ message: "Update failed" });
//     }
//   });
// };


export const updateAdminProfile = (req, res) => {
  upload.single("profileImage")(req, res, async (err) => {

    if (err) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    try {

      const admin = await Admin.findById(req.user.id);

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const { name, phone, email } = req.body;

      /* ===== EMAIL CHECK ===== */

      if (email && email !== admin.email) {

        const emailExists = await Admin.findOne({ email });

        if (emailExists) {
          return res.status(400).json({
            message: "Email already in use"
          });
        }

        admin.email = email;
      }

      /* ===== NAME UPDATE ===== */

      if (name) {
        admin.name = name;
      }

      /* ===== PHONE UPDATE ===== */

      if (phone) {
        admin.phone = phone;
      }

      /* ===== PROFILE IMAGE UPDATE ===== */

      if (req.file) {

        if (admin.profile?.public_id) {
          await cloudinary.uploader.destroy(admin.profile.public_id);
        }

        const uploaded = await cloudinary.uploader.upload(req.file.path, {
          folder: "admin_profiles",
        });

        admin.profile = {
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        };

        fs.unlinkSync(req.file.path);
      }

      await admin.save();

      res.json({
        success: true,
        message: "Profile updated successfully",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
          profile: admin.profile
        }
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Profile update failed"
      });

    }

  });
};

/* ================= CHANGE PASSWORD ================= */

export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords required" });
    }

    const admin = await Admin.findById(req.user.id);

    const match = await bcrypt.compare(oldPassword, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Old password incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);

    await admin.save();

    res.json({
      success: true,
      message: "Password updated",
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ADMIN STATS ================= */

export const adminStats = async (req, res) => {
  try {
    const stats = {
      totalAdmins: await Admin.countDocuments(),
      profileCompleted: await Admin.countDocuments({
        "profile.url": { $exists: true },
      }),
    };

    res.json({
      success: true,
      stats,
    });
  } catch {
    res.status(500).json({ message: "Failed to load stats" });
  }
};

/* ================= FORGOT PASSWORD ================= */

export const forgotAdminPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // generate OTP
    const otp = crypto.randomInt(100000, 1000000);

    // hash OTP
    const hashOTP = await bcrypt.hash(String(otp), 10);

    admin.resetOTP = hashOTP;
    admin.resetOTPExpire = Date.now() + 5 * 60 * 1000;
    admin.resetOTPVerified = false;
    admin.otpAttempts = 0;

    await admin.save();

    // send email
    await sendEmail({
      email: admin.email,
      subject: "Admin Password Reset OTP",
      message: `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to send OTP" });
  }
};

export const verifyAdminOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "All fields required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.resetOTPExpire < Date.now()) {
      admin.resetOTP = null;
      await admin.save();
      return res.status(400).json({ message: "OTP expired" });
    }

    if (admin.otpAttempts >= 5) {
      return res.status(429).json({ message: "Too many attempts" });
    }

    const verify = await bcrypt.compare(String(otp), admin.resetOTP);

    if (!verify) {
      admin.otpAttempts += 1;
      await admin.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    admin.resetOTPVerified = true;
    admin.otpAttempts = 0;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "OTP verified",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to verify OTP" });
  }
};

/* ================= RESET PASSWORD ================= */

export const resetAdminPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.resetOTPVerified) {
      return res.status(403).json({ message: "OTP verification required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    // clear OTP fields
    admin.resetOTP = null;
    admin.resetOTPExpire = null;
    admin.resetOTPVerified = false;
    admin.otpAttempts = 0;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to reset password" });
  }
};
