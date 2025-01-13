import express from "express"
import { googleAuth, userLogin, userLogout, userRegistration } from "../controllers/userController.js"

const router = express.Router()

router.post("/registration", userRegistration)
router.post("/login", userLogin)
router.post("/google", googleAuth)
router.post("/logout", userLogout)

export default router