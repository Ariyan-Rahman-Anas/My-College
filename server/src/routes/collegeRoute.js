import express from 'express';
import { collegeList, getSingleCollege, searchCollege } from '../controllers/collegeController.js';

const router = express.Router()

router.get("/list", collegeList)
router.get("/:id", getSingleCollege)
router.get("/search", searchCollege); 

export default router;