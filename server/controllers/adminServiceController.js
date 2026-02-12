import slugify from "slugify";
import cloudinary from "../utils/cloudinary.js";
import Service from "../models/Service.js";

/* ➕ CREATE SERVICE */
export const createService = async (req, res) => {
  try {
    const { title, shortDesc, longDesc, icon } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Service.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Service already exists" });
    }

    // parse arrays
    const whyChoose = JSON.parse(req.body.whyChoose || "[]");
    const process = JSON.parse(req.body.process || "[]");
    const technologies = JSON.parse(req.body.technologies || "[]");
    let projects = JSON.parse(req.body.projects || "[]");

    // upload multiple project images
    if (req.files && req.files.projects) {
      for (let i = 0; i < req.files.projects.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.projects[i].path,
          { folder: "services/projects" }
        );
        projects[i].image = result.secure_url;
      }
    }

    const service = await Service.create({
      title,
      slug,
      shortDesc,
      longDesc,
      icon,
      whyChoose,
      process,
      technologies,
      projects,
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 📥 GET ALL (Public) */
export const getPublicServices = async (req, res) => {
  const services = await Service.find({ isActive: true }).sort({
    createdAt: -1,
  });
  res.json(services);
};

/* 🔐 GET ALL (Admin) */
export const getAdminServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

/* 📄 GET SINGLE (by slug) */
export const getServiceBySlug = async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) return res.status(404).json({ message: "Not found" });
  res.json(service);
};

/* ✏ UPDATE SERVICE */
export const updateService = async (req, res) => {
  try {
    const { title, shortDesc, longDesc, icon, isActive } = req.body;

    const data = { shortDesc, longDesc, icon, isActive };

    if (title) {
      data.title = title;
      data.slug = slugify(title, { lower: true, strict: true });
    }

    const whyChoose = JSON.parse(req.body.whyChoose || "[]");
    const process = JSON.parse(req.body.process || "[]");
    const technologies = JSON.parse(req.body.technologies || "[]");
    let projects = JSON.parse(req.body.projects || "[]");

    data.whyChoose = whyChoose;
    data.process = process;
    data.technologies = technologies;

    // update images if new uploaded
    if (req.files && req.files.projects) {
      for (let i = 0; i < req.files.projects.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.projects[i].path,
          { folder: "services/projects" }
        );
        projects[i].image = result.secure_url;
      }
    }

    data.projects = projects;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🗑 DELETE SERVICE */
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};

// 📄 GET SINGLE SERVICE (PUBLIC by slug)
export const getPublicServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!service)
      return res.status(404).json({ message: "Service not found" });

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
