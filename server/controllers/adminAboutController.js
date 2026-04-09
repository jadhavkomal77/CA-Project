// // controllers/adminAboutController.js
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
      teamMembers,
    } = req.body;

    let imageUrl;

    /* MAIN IMAGE */
    if (req.files?.image) {
      const uploadRes = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "about" }
      );

      imageUrl = uploadRes.secure_url;
      fs.unlinkSync(req.files.image[0].path);
    }

    /* PARSE MEMBERS */
    let parsedMembers = [];

    if (teamMembers) {
      parsedMembers =
        typeof teamMembers === "string"
          ? JSON.parse(teamMembers)
          : teamMembers;
    }

    /* UPLOAD TEAM PHOTOS */
 if (req.files?.teamPhotos) {

  let uploadIndex = 0;

  parsedMembers = parsedMembers.map((member) => {

    // new image आहे (photo empty)
    if (!member.photo || member.photo === "") {

      const file = req.files.teamPhotos[uploadIndex];

      uploadIndex++;

      return {
        ...member,
        photo: file ? file.path : member.photo
      };

    }

    return member;
  });

  // upload cloudinary
  for (let i = 0; i < req.files.teamPhotos.length; i++) {

    const file = req.files.teamPhotos[i];

    const uploadRes = await cloudinary.uploader.upload(file.path,{
      folder:"team"
    });

    fs.unlinkSync(file.path);

    parsedMembers[i].photo = uploadRes.secure_url;
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

      if (imageUrl) {
        about.image = imageUrl;
      }

      about.teamMembers = parsedMembers;

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
        teamMembers: parsedMembers,
      });

    }

    res.json({
      message: "About updated successfully",
      about,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

