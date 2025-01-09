import jwt from "jsonwebtoken";
import config from "../config/config.js";

const JWT_SECRET = config.jwt_secret || "my_secret_key";
const JWT_EXPIRE_TIME = config.jwt_expiry || "1h";

// Function to generate a JWT token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
};

// Function to send the token as a cookie
export const sendTokenInCookie = (res, userId) => {
  const token = generateToken(userId);

  // Send token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 86400000),
    sameSite: "strict",
  });
};