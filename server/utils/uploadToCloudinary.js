import cloudinary from "./cloudinary.js";

export const uploadBuffer = (buffer, folder) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: "auto" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
      .end(buffer);
  });