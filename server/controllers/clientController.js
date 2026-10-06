import fs from "fs";
import Client from "../models/Client.js";
import cloudinary from "../utils/cloudinary.js";

const uploadLogo = async (file) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "clients",
  });
  fs.unlinkSync(file.path);
  return result.secure_url;
};

/* 🌍 PUBLIC — ACTIVE ONLY */
export const getPublicClients = async (req, res) => {
  try {
    const data = await Client.find({ isActive: true })
      .select("_id name logo order")
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load clients" });
  }
};

/* 🔐 ADMIN — ALL */
export const getAdminClients = async (req, res) => {
  try {
    const data = await Client.find().sort({ order: 1, createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load clients" });
  }
};

/* 🔐 CREATE */
export const createClient = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Client name required" });
    if (!req.file) return res.status(400).json({ message: "Logo image required" });

    const client = await Client.create({
      name,
      logo: await uploadLogo(req.file),
      isActive: req.body.isActive !== "false",
      order: await Client.countDocuments(), // append to the end
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔐 UPDATE — only overwrite what was actually sent */
export const updateClient = async (req, res) => {
  try {
    const data = {};

    if (req.body.name) data.name = req.body.name;
    if (req.body.isActive !== undefined)
      data.isActive = req.body.isActive !== "false";
    if (req.file) data.logo = await uploadLogo(req.file);

    const client = await Client.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!client) return res.status(404).json({ message: "Client not found" });

    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔐 DELETE */
export const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/* 🔐 REORDER — accepts the full list in the desired display order */
export const reorderClients = async (req, res) => {
  try {
    const { list } = req.body;

    if (!Array.isArray(list))
      return res.status(400).json({ message: "Invalid reorder data" });

    await Client.bulkWrite(
      list.map((item, index) => ({
        updateOne: {
          filter: { _id: item._id },
          update: { order: index },
        },
      }))
    );

    res.json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
