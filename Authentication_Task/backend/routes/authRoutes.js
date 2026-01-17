const express = require("express");
const { sendOtp,registerUser ,verifyOtp} = require("../controller/authController");
const router = express.Router();

router.post('/send-otp',sendOtp)
router.post('/register',registerUser)
router.post('/verify-otp',verifyOtp)

module.exports = router