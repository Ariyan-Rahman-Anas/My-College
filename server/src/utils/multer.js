import multer from "multer";

const storage = multer.memoryStorage();

// Multer middleware to handle a single file upload
export const multerMiddleware = multer({ storage }).single("image");

export const config = {
  api: {
    bodyParser: false,
  },
};