import CollegeReviewModel from "../models/clgReviewModel.js"

export const postReview = async (req, res, next) => {
    try {
        const { reviewer, rate, comment, college } = req.body
        if (!reviewer || !rate || !college || !comment) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        if (rate > 5) {
            return res.status(400).json({
                success: false,
                message: "Rate should be between 1 and 5",
            })
        }
        const newReview = CollegeReviewModel.create({ reviewer, rate, comment, college })
        res.status(201).json({
            success: true,
            message: "Review posted successfully",
            newReview,
        })
    } catch (error) {
        next(error)
    }
}

export const getReviewsByClg = async (req, res, next) => {
    try {
        const { clgId } = req.query
        if (!clgId) {
            return res.status(400).json({
                success: false,
                message: "Provide College ID",
            })
        }
        const reviews = await CollegeReviewModel.find({college:clgId}).populate("reviewer").populate("college")
        if (reviews.length < 1) {
            return res.status(404).json({
                success: false,
                message: "No reviews found for this college",
            })
        }
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            totalReviews: reviews.length,
            reviews,
        })
    } catch (error) {
        next(error)
    }
}