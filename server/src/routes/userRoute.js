import express from "express"
import {
    googleAuth,
    updateUserProfile,
    userLogin,
    userLogout,
    userRegistration
} from "../controllers/userController.js"

const router = express.Router()

router.post("/registration", userRegistration)
router.post("/login", userLogin)
router.post("/google", googleAuth)
router.post("/logout", userLogout)
router.patch("/edit-profile", updateUserProfile)

export default router