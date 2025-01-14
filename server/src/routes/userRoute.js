import express from "express"
import {
    forgotPasswordSession,
    googleAuth,
    resetPassword,
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
router.post("/forgot-session", forgotPasswordSession)
router.patch("/reset-password", resetPassword)


export default router