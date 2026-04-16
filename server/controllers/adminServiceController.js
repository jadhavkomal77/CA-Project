
import slugify from "slugify";
import cloudinary from "../utils/cloudinary.js";
import Service from "../models/Service.js";
import fs from "fs";


const parseJSON = (data, fallback = []) => {
  try {
    return JSON.parse(data || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};


export const createService = async (req, res) => {
  try {
    const { title, shortDesc, longDesc, icon } = req.body;

    /* validation */
    if (!title || !shortDesc)
      return res.status(400).json({ message: "Title and Short Description required" });

    const slug = slugify(title, { lower: true, strict: true });

    /* duplicate check */
    const exists = await Service.findOne({ slug });
    if (exists)
      return res.status(400).json({ message: "Service already exists" });

    const whyChoose = parseJSON(req.body.whyChoose);
    const process = parseJSON(req.body.process);
    const technologies = parseJSON(req.body.technologies);
    let projects = parseJSON(req.body.projects);
    const requiredDocuments = parseJSON(req.body.requiredDocuments);

    /* upload images */
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "services/projects",
        });

        const target = projects.find(p => !p.image);
        if (target) target.image = result.secure_url;

        fs.unlinkSync(file.path);
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
      requiredDocuments,
    });

    res.status(201).json(service);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getPublicServices = async (req, res) => {
  try {
    // List view needs only card data; avoid sending heavy detail fields.
    const services = await Service.find({ isActive: true })
      .select("_id title slug shortDesc icon")
      .sort({ createdAt: -1 })
      .lean();

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAdminServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};


/* ===============================
   📄 GET SINGLE
================================ */
export const getServiceBySlug = async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
};


/* ===============================
   ✏ UPDATE SERVICE
================================ */
export const updateService = async (req, res) => {
  try {
    const { title, shortDesc, longDesc, icon, isActive } = req.body;

    const data = { shortDesc, longDesc, icon, isActive };

    /* title update + slug check */
    if (title) {
      const newSlug = slugify(title, { lower: true, strict: true });

      const exists = await Service.findOne({
        slug: newSlug,
        _id: { $ne: req.params.id },
      });

      if (exists)
        return res.status(400).json({ message: "Service with this title already exists" });

      data.title = title;
      data.slug = newSlug;
    }

    const whyChoose = parseJSON(req.body.whyChoose);
    const process = parseJSON(req.body.process);
    const technologies = parseJSON(req.body.technologies);
    let projects = parseJSON(req.body.projects);
    const requiredDocuments = parseJSON(req.body.requiredDocuments);

    data.whyChoose = whyChoose;
    data.process = process;
    data.technologies = technologies;
    data.requiredDocuments = requiredDocuments;

    /* image update */
    if (req.files?.length) {
      for (const file of req.files) {

        const result = await cloudinary.uploader.upload(file.path, {
          folder: "services/projects",
        });

        const target = projects.find(p => !p.image);
        if (target) target.image = result.secure_url;

        fs.unlinkSync(file.path);
      }
    }

    data.projects = projects;

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Service not found" });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ===============================
   🗑 DELETE
================================ */
export const deleteService = async (req, res) => {
  const deleted = await Service.findByIdAndDelete(req.params.id);

  if (!deleted)
    return res.status(404).json({ message: "Service not found" });

  res.json({ message: "Service deleted successfully" });
};


/* ===============================
   🌍 PUBLIC SINGLE
================================ */
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
