import cloudinary from "./cloudinary.js";

export const uploadBuffer = (
  buffer,
  folder,
  filename,
  mimetype
) =>
  new Promise((resolve, reject) => {
    const resourceType =
      mimetype?.startsWith("image/")
        ? "image"
        : mimetype?.startsWith("video/")
        ? "video"
        : "raw";

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename?.split(".")[0],
        resource_type: resourceType,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    stream.end(buffer);
  });

  

// ******************************


// import cloudinary from "./cloudinary.js";

// export const uploadBuffer = (
//   buffer,
//   folder,
//   filename,
//   mimetype
// ) =>
//   new Promise((resolve, reject) => {
//     const resourceType =
//       mimetype?.startsWith("image")
//         ? "image"
//         : mimetype?.startsWith("video")
//         ? "video"
//         : "raw";

//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         public_id: filename,
//         resource_type: resourceType,
//       },
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }
//     );

//     stream.end(buffer);
//   });

// ******************************

// import cloudinary from "./cloudinary.js";

// export const uploadBuffer = (buffer, folder, mimetype) =>
//   new Promise((resolve, reject) => {
//     let resourceType = "raw";

//     if (mimetype?.startsWith("image/")) resourceType = "image";
//     else if (mimetype?.startsWith("video/")) resourceType = "video";

//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         resource_type: resourceType,
//       },
//       (err, result) => {
//         if (err) return reject(err);

//         resolve({
//           secure_url: result.secure_url,
//           public_id: result.public_id,
//           resource_type: resourceType,
//         });
//       }
//     );

//     stream.end(buffer);
//   });