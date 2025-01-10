import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Helper function to upload a single image to Cloudinary
export const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        // Create a Readable stream from the file buffer
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null); // End of the stream

        // Cloudinary upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "products" }, // Folder in Cloudinary
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        );

        // Pipe the readable stream to Cloudinary's upload stream
        readableStream.pipe(uploadStream);
    });
};