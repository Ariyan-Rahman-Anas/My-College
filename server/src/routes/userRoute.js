import express from "express"
import { userLogin, userLogout, userRegistration } from "../controllers/userController.js"

const router = express.Router()

router.post("/registration", userRegistration)
router.post("/login", userLogin)
router.post("/logout", userLogout)

export default router