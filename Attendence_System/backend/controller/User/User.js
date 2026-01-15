const { UserModel } = require("../../models/Model");
const { signupSchema, loginSchema } = require("../../validators/auth.scheme")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signUp = async (req, res) => {
    try {

        const parsed = signupSchema.safeParse(req.body)    //safeParse it is an from zob library it return the object of success of boolean then data with given data and error with error messafge
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                error: "Invalid request schema",
            })
        }

        const { email, name, password, role } = parsed.data;
        const exisitUser = await UserModel.findOne({ email })
        if (exisitUser) {
            return res.status(400).json({
                success: false,
                error: "Email already exists"
            })
        }
        //now create new user
        const hashPassword = await bcrypt.hash(password, 10)
        // console.log("hashPassword",hashPassword)

        const newUser = await UserModel.create({
            name,
            email,
            password: hashPassword,
            role
        })

        return res.status(201).json({ message: true, data: {
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
        } })
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }

}

const login = async (req,res)=>{
    try{
         const parsed = loginSchema.safeParse(req.body)
     if (!parsed.success) {
            return res.status(400).json({
                success: false,
                error: "Invalid request schema",
            })
        }

        const {email,password} = parsed.data;

        const user = await UserModel.findOne({email});
        // console.log("User",user.password)
        if(!user){
            return res.status(400).json({
      success: false,
      error: "Invalid email or password"
})}

        const isMatchPassword =  bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(400).json({
      success: false,
      error: "Invalid email or password"
})
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })
        return res.status(200).json({message:true,data:{token:token}})

    }catch(error){
                return res.status(500).json({ message: "Server Error", error: error.message })

    }
   
}


const me = async(req,res)=>{
try{
    if(!req.user){
        return res.status(401).json({success:false,error:"Unauthorized, token missing or invalid"})
    }

    return res.status(200).json({success:true,user:req.user})

}catch(error){
    return res.status(500).json({success:false,message:error.message})
}
}
module.exports = {signUp, login ,me}