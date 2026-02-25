
import cloudinary from "./cloudinary.js";

export const uploadBuffer = (buffer, folder, filename, mimetype) =>
  new Promise((resolve, reject) => {
    let resourceType = "raw";

    if (mimetype?.startsWith("image/")) resourceType = "image";
    else if (mimetype?.startsWith("video/")) resourceType = "video";

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename,
        resource_type: resourceType,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    stream.end(buffer);
  });