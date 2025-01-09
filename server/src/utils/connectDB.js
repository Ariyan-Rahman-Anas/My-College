import mongoose from "mongoose";
import config from "../config/config.js";

export const connectDB = async () => {
  try {
      const mongoURI = config.mongodb_url;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error: ", error.message);
    process.exit(1);
  }
};