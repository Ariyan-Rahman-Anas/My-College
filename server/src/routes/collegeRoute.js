import express from 'express';
import { allCollege, collegeListWithPagination, getSingleCollege, searchCollege } from '../controllers/collegeController.js';

const router = express.Router()

router.get("/list", collegeListWithPagination)
router.get("/all", allCollege)
router.get("/:id", getSingleCollege)
router.get("/search/:key", searchCollege); 

export default router;