import { uploadImageToCloudinary } from './../utils/uploadImagesToCloudinary.js';

import MyCollegeModel from './../models/myCollegeModel.js';

export const createMyCollege = async (req, res, next) => {
    try {
        const image = req.file;
        console.log({image})
        const { name, email, phone, address, dob, college, subject } = req.body;
        console.log({name, email, phone, address, dob, college, subject})

        // Validate required fields
        if (!name || !email || !phone || !address || !dob || !college || !subject) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Validate if image is provided
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Please provide your image",
            });
        }

        // Upload image to Cloudinary
        const imgUrl = await uploadImageToCloudinary(image);

        // Validate Cloudinary response
        if (!imgUrl || !imgUrl.url) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload image",
            });
        }

        const newCollege = await MyCollegeModel.create({
            name,
            email,
            phone,
            address,
            dob,
            college,
            subject,
            image: imgUrl,
        })

        // Send success response
        return res.status(201).json({
            success: true,
            message: "College created successfully",
            newCollege
        });
    } catch (error) {
        next(error);
        console.log("err is " + error.message)
    }
};

export const getMyCollege = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Provide your Email",
            });
        }

        const colleges = await MyCollegeModel.find({ email: email }).populate("college")
        if (colleges.length < 1) {
            return res.status(404).json({
                success: false,
                message: "You have not select any college yet.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Colleges found successfully",
            totalColleges: colleges.length,
            colleges,
        });
    } catch (error) {
        next(error)
    }
}