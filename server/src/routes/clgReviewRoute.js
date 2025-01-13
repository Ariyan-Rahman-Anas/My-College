import express from 'express';
import { getReviewsByClg, postReview } from '../controllers/clgReviewController.js';
const router = express.Router()

router.post("/create", postReview )
router.get("/clg-review", getReviewsByClg )

export default router