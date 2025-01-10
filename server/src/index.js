import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import { connectDB } from "./utils/connectDB.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

import userRoute from "./routes/userRoute.js"
import collegeRoute from "./routes/collegeRoute.js";
import myCollegeRoute from "./routes/myCollegeRoute.js";

const app = express();
const port = config.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [config.client_side_url,
      "http://localhost:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Basic or testing route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the server API!",
    data: null,
  });
});


app.use("/api/users", userRoute);
app.use("/api/colleges", collegeRoute);
app.use("/api/my-college", myCollegeRoute);

// Cloudinary configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Server connection failed:", err.message);
  });