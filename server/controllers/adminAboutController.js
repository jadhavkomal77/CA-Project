// // controllers/adminAboutController.js
import fs from "fs";
import About from "../models/About.js";
import cloudinary from "../utils/cloudinary.js";

/* 🌍 Public */
export const getPublicAbout = async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to load about section" });
  }
};

/* 🔐 Admin */
export const getAdminAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to load about section" });
  }
};

/* 🔐 Create / Update */
// export const saveAbout = async (req, res) => {
//   try {
//     const {
//       headingSmall,
//       title,
//       description1,
//       description2,
//       experience,
//       isActive,
//     } = req.body;

//     let imageUrl;

//     if (req.file) {
//       const uploadRes = await cloudinary.uploader.upload(req.file.path, {
//         folder: "about",
//       });
//       imageUrl = uploadRes.secure_url;
//       fs.unlinkSync(req.file.path);
//     }

//     let about = await About.findOne();

//     if (about) {
//       about.headingSmall = headingSmall;
//       about.title = title;
//       about.description1 = description1;
//       about.description2 = description2;
//       about.experience = experience;
//       about.isActive = isActive;
//       if (imageUrl) about.image = imageUrl;
//       await about.save();
//     } else {
//       about = await About.create({
//         headingSmall,
//         title,
//         description1,
//         description2,
//         experience,
//         image: imageUrl,
//         isActive,
//       });
//     }

//     res.json({ message: "About section updated", about });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update about section" });
//   }
// };







// import fs from "fs";
// import About from "../models/About.js";
// import cloudinary from "../utils/cloudinary.js";

// /* 🌍 Public */
// export const getPublicAbout = async (req, res) => {
//   try {
//     const about = await About.findOne({ isActive: true });
//     res.json(about);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to load about section" });
//   }
// };

// /* 🔐 Admin */
// export const getAdminAbout = async (req, res) => {
//   try {
//     const about = await About.findOne();
//     res.json(about);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to load about section" });
//   }
// };

// /* 🔐 Create / Update */

// export const saveAbout = async (req, res) => {
//   try {
//     const {
//       headingSmall,
//       title,
//       description1,
//       description2,
//       experience,
//       isActive,
//       teamMembers,
//     } = req.body;

//     let imageUrl;

//     /* MAIN IMAGE UPLOAD */
//     if (req.files?.image) {
//       const uploadRes = await cloudinary.uploader.upload(
//         req.files.image[0].path,
//         { folder: "about" }
//       );

//       imageUrl = uploadRes.secure_url;
//       fs.unlinkSync(req.files.image[0].path);
//     }

//     /* PARSE TEAM MEMBERS */
//     let parsedMembers = [];
//     if (teamMembers) {
//       parsedMembers =
//         typeof teamMembers === "string"
//           ? JSON.parse(teamMembers)
//           : teamMembers;
//     }

//     /* TEAM IMAGE UPLOAD */
//     const uploadedPhotos = [];

//     if (req.files?.teamPhotos) {
//       for (const file of req.files.teamPhotos) {
//         const uploadRes = await cloudinary.uploader.upload(file.path, {
//           folder: "team",
//         });

//         uploadedPhotos.push(uploadRes.secure_url);
//         fs.unlinkSync(file.path);
//       }
//     }

//     /* MAP CLOUDINARY URL INTO MEMBERS */
//     if (uploadedPhotos.length > 0) {
//       parsedMembers = parsedMembers.map((m, i) => ({
//         ...m,
//         photo: uploadedPhotos[i] || m.photo || "",
//       }));
//     }

//     let about = await About.findOne();

//     if (about) {
//       about.headingSmall = headingSmall;
//       about.title = title;
//       about.description1 = description1;
//       about.description2 = description2;
//       about.experience = experience;
//       about.isActive = isActive;

//       if (parsedMembers.length > 0) {
//         about.teamMembers = parsedMembers;
//       }

//       if (imageUrl) about.image = imageUrl;

//       await about.save();
//     } else {
//       about = await About.create({
//         headingSmall,
//         title,
//         description1,
//         description2,
//         experience,
//         image: imageUrl,
//         isActive,
//         teamMembers: parsedMembers,
//       });
//     }

//     res.json({ message: "About section updated", about });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to update about section" });
//   }
// };



export const saveAbout = async (req, res) => {
  try {
    const {
      headingSmall,
      title,
      description1,
      description2,
      experience,
      isActive,
      teamMembers
    } = req.body;

    let imageUrl;

    /* ✅ MAIN IMAGE */
    if (req.files?.image) {
      const uploadRes = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "about" }
      );

      imageUrl = uploadRes.secure_url;
      fs.unlinkSync(req.files.image[0].path);
    }

    /* ✅ TEAM MEMBERS PARSE */
    let members = JSON.parse(teamMembers || "[]");

    /* ✅ TEAM IMAGE UPLOAD (FIXED LOGIC) */
    if (req.files?.teamPhotos) {

      let fileIndex = 0; // 🔥 MAIN FIX

      for (let i = 0; i < members.length; i++) {

        // 👉 only if new file exists
        if (req.files.teamPhotos[fileIndex]) {

          const file = req.files.teamPhotos[fileIndex];

          const uploadRes = await cloudinary.uploader.upload(
            file.path,
            { folder: "team" }
          );

          members[i].photo = uploadRes.secure_url;

          fs.unlinkSync(file.path);

          fileIndex++; // 🔥 only increment when used
        }

        // ❗ else → जुना photo जसाच्या तसा राहील
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

      about.teamMembers = members;

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
        teamMembers: members
      });
    }

    res.json({
      message: "About saved successfully",
      about
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error saving about"
    });
  }
};