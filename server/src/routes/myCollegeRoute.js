import express from 'express';
import { createMyCollege, getMyCollege } from '../controllers/myCollegeController.js';
import { multerMiddleware } from './../utils/multer.js';
const router = express.Router()

router.post("/create", multerMiddleware, createMyCollege)
router.get("/list", getMyCollege)

export default router