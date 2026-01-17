const { UserModel } = require("../model/user");
const jwt = require("jsonwebtoken")

const authMiddleware = async(req,res,next)=>{
    try{

        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false,error:"token not found"})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findOne({
            _id:decode.token,
            "devices.token":token
        })

        if(!user){
            return res.status(401).json({success:false,error:"Session Expired logged out from this device"})
        }

        req.user = user;
        req.token = token
        next()

    }catch(error){
        return res.status(401).json({ error: "Invalid or expired token",error:error.message})
}
}

module.exports = {authMiddleware}