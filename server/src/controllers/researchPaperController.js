import ResearchPaperModel from "../models/researchPaperModel.js"

export const getAllResearchPaper = async (req, res, next) => {
    try {
        const researchPapers = await ResearchPaperModel.find({})
        if (researchPapers.length < 1) {
            return res.status(404).json({
                success: false,
                message: "No research papers found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Research papers fetched successfully",
            totalResearchPapers: researchPapers.length,
            researchPapers,
        })
    } catch (error) {
        next(error)
    }
}


export const getResearchPaperById = async (req, res, next) => {
    try {
        const researchPaper = await ResearchPaperModel.findById(req.params.id)
        if (!researchPaper) {
            return res.status(404).json({
                success: false,
                message: "Research paper not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Research paper fetched successfully",
            researchPaper,
        })

    } catch (error) {
        next(error)
    }
}