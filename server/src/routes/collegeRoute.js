import express from 'express';
import { collegeList, getSingleCollege } from '../controllers/collegeController.js';

const router = express.Router()

router.get("/list", collegeList)
router.get("/:id", getSingleCollege)

export default router;