import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier"; // Converts buffer to stream

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFile = async (fileBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "Car-Mgmt",
          width: 1080,
          height: 1620,
          aspect_ratio: "2:3",
          crop: "fill",
          gravity: "auto",
          allowed_formats: ["png", "jpg", "jpeg", "svg"],
          quality: "auto",
          format: "auto",
        },
        (error, result) => {
          if (error) {
            reject("Cloudinary Upload failed: " + error.message);
          } else {
            resolve(result);
          }
        }
      );

      // Convert Buffer to Readable Stream
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.log("Cloudinary Upload failed:", error.message);
    throw error;
  }
};

export { uploadFile };
