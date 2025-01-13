import bcrypt from "bcrypt"
import UserModel from './../models/userModel.js';
import config from "../config/config.js";
import { generateToken, sendTokenInCookie } from "../utils/generateJWT.js";

export const userRegistration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    // Validate input data
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists, please log in",
      });
    }

    // Validate password strength
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!regex.test(password)) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    //     });
    // }

    // Step 1: Check for minimum length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Step 2: Check for at least one letter (uppercase or lowercase)
    if (!/[A-Za-z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one letter",
      });
    }

    // Step 3: Check for at least one number
    if (!/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one number",
      });
    }

    // Step 4: Check for at least one special character
    if (!/[@$!%*?&]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one special character",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password, 10);

    // Create a new user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user,
    });
  } catch (error) {
    next(error)
  }
}


export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString())

    sendTokenInCookie(res, user._id.toString())

    res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user,
      token,
    });

  } catch (error) {
    next(error)
  }
}


// // Google auth--
// export const googleAuth = async (req, res, next) => {
//   try {
//     console.log(req.body.email)
//     console.log(req.body.name)
//     const user = await UserModel.findOne({ email: req.body.email });
//     if (user) {
//       // Generate JWT token
//       const token = generateToken(user._id.toString())

//       sendTokenInCookie(res, user._id.toString())

//       res.status(200).json({
//         success: true,
//         message: `Welcome back ${user.name}`,
//         user,
//         token,
//       });
//     } else {
//       const generatedPassword = Math.random().toString(36).slice(-8);
//       const generatedUsername =
//         req.body.name.split(" ").join("").toLowerCase() +
//         Math.floor(Math.random() * 10000).toString();

//       const newUser = await UserModel.create({
//         name: generatedUsername,
//         email: req.body.email,
//         password: generatedPassword
//       });
//        // Generate JWT token
//       const token = generateToken(newUser._id.toString())

//       sendTokenInCookie(res, newUser._id.toString())

//       res.status(200).json({
//         success: true,
//         message: `Welcome ${newUser.name}`,
//         newUser,
//         token,
//       });
//     }
//   } catch (err) {
//     next(err)
//   }
// };

export const googleAuth = async (req, res, next) => {
  try {
    console.log(req.body.email)
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const token = generateToken(user._id.toString());
      sendTokenInCookie(res, user._id.toString());
      return res.status(200).json({
        success: true,
        message: `Welcome back ${user.name}`,
        user,
        token,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10); // Hash password
      const generatedUsername =
        req.body.name?.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString();

      const newUser = await UserModel.create({
        name: req.body.name, // Actual name
        username: generatedUsername, // Generated username
        email: req.body.email,
        password: hashedPassword, // Store hashed password
      });

      const token = generateToken(newUser._id.toString());
      sendTokenInCookie(res, newUser._id.toString());
      return res.status(200).json({
        success: true,
        message: `Welcome ${newUser.name}`,
        user: newUser, // Return the new user
        token,
      });
    }
  } catch (err) {
    next(err);
  }
};


export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    next(error)
  }
}