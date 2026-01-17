const express = require("express");
const { sendOtp,registerUser ,verifyOtp,logOut} = require("../controller/authController");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.post('/send-otp',sendOtp)
router.post('/register',registerUser)
router.post('/verify-otp',verifyOtp)
router.post('/logout',authMiddleware,logOut)

module.exports = router