import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import config from "./src/config/config.js";
import { connectDB } from "./src/utils/connectDB.js";
dotenv.config();

import userRoute from "./src/routes/userRoute.js"
import collegeRoute from "./src/routes/collegeRoute.js";
import myCollegeRoute from "./src/routes/myCollegeRoute.js";
import clgReviewRoute from "./src/routes/clgReviewRoute.js";
import researchPaperRoute from "./src/routes/researchPaperRoute.js";

const app = express();
const port = config.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [config.client_side_url,
      "http://localhost:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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
app.use("/api/reviews", clgReviewRoute);
app.use("/api/research", researchPaperRoute);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Server connection failed:", err.message);
  });