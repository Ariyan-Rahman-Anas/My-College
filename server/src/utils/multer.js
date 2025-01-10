import multer from "multer";

// Use Multer's memory storage to keep file data in memory (required for Cloudinary)
const storage = multer.memoryStorage();

// Multer middleware to handle a single file upload
export const multerMiddleware = multer({ storage }).single("image"); // Use "image" as the field name

export const config = {
  api: {
    bodyParser: false, // Disable body parser
  },
};