import express from "express"
import { getAllResearchPaper, getResearchPaperById } from "../controllers/researchPaperController.js"

const router = express.Router()

router.get("/list", getAllResearchPaper)
router.get("/:id", getResearchPaperById)

export default router