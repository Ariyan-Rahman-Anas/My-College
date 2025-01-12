import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import config from "../config/config.js";

// Cloudinary configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});


export const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);

        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return reject(error);
                }
                resolve({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        );

        readableStream.pipe(uploadStream);
    });
};