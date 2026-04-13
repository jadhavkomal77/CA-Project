
import fs from "fs";
import About from "../models/About.js";
import cloudinary from "../utils/cloudinary.js";

export const getPublicAbout = async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to load about section" });
  }
};

export const getAdminAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to load about section" });
  }
};

export const saveAbout = async (req, res) => {
  try {
    const {
      headingSmall,
      title,
      description1,
      description2,
      experience,
      isActive,
      teamMembers,
    } = req.body;

    let imageUrl;

    if (req.files?.image) {
      const uploadRes = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "about" }
      );
      imageUrl = uploadRes.secure_url;
      fs.unlinkSync(req.files.image[0].path);
    }

    let members = [];
    if (teamMembers) {
      members = JSON.parse(teamMembers);
    }

    if (req.files?.teamPhotos && req.files.teamPhotos.length > 0) {
      for (let i = 0; i < req.files.teamPhotos.length; i++) {
        if (members[i]) {
          const file = req.files.teamPhotos[i];
          const uploadRes = await cloudinary.uploader.upload(file.path, {
            folder: "team",
          });
          members[i].photo = uploadRes.secure_url;
          fs.unlinkSync(file.path);
        }
      }
    }

    let about = await About.findOne();

    if (about) {
      about.headingSmall = headingSmall;
      about.title = title;
      about.description1 = description1;
      about.description2 = description2;
      about.experience = experience;
      about.isActive = isActive;

      if (imageUrl) about.image = imageUrl;

      if (teamMembers) about.teamMembers = members;

      await about.save();
    } else {
      about = await About.create({
        headingSmall,
        title,
        description1,
        description2,
        experience,
        image: imageUrl,
        isActive,
        teamMembers: members,
      });
    }

    res.json({
      message: "About saved successfully",
      about,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error saving about",
    });
  }
};

export const addTeamMember = async (req, res) => {
  try {
    const { name, shortDetails } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About document not found" });
    }

    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
      folder: "team",
    });

    fs.unlinkSync(req.file.path);

    about.teamMembers.push({
      name,
      photo: uploadRes.secure_url,
      shortDetails,
    });

    await about.save();

    res.json({
      message: "Team member added successfully",
      about,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding team member" });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, shortDetails } = req.body;

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About document not found" });
    }

    const member = about.teamMembers.id(id);
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }

    if (name !== undefined) member.name = name;
    if (shortDetails !== undefined) member.shortDetails = shortDetails;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "team",
      });
      fs.unlinkSync(req.file.path);
      member.photo = uploadRes.secure_url;
    }

    await about.save();

    res.json({
      message: "Team member updated successfully",
      about,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating team member" });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About document not found" });
    }

    about.teamMembers.pull(id);
    await about.save();

    res.json({
      message: "Team member deleted successfully",
      about,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting team member" });
  }
};
