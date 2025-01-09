import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXPIRE_TIME,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  client_side_url: process.env.CLIENT_URL,
};



//   cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
//   cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,