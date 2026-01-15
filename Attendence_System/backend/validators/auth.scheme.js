const { sign } = require("jsonwebtoken")
const {z} = require("zod")

const signupSchema =  z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
    role: z.enum(["teacher","student"])
})

const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

//create class
const classScheme = z.object({
    className:z.string()
})

//add student to class
const addStudentSchema = z.object({
    studentIds: z.string()
})

module.exports = {signupSchema,loginSchema,classScheme, addStudentSchema}