const {z} = require("zod");

const sendOtpSchema = z.object({
    phone:z.string().min(10)
})

const registerSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    phone:z.string().min(10)
})

const verifyOtpSchema = z.object({
    otp:z.string().min(6),
    phone:z.string().min(10)
})

module.exports = {sendOtpSchema,registerSchema,verifyOtpSchema}