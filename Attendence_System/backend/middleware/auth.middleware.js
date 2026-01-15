const { UserModel } = require("../models/Model");
const jwt = require("jsonwebtoken")

 const  authMiddleware = async (req,res,next)=>{
  try{

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized, token missing or invalid"
      });
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({success:false,error:"Unauthorized, token missing or invalid"})
    }
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId).select("-password");
    if(!user){
                return res.status(401).json({success:false,error:"Unauthorized, token missing or invalid"})

    }

    req.user = user;
    next();


  }catch(error){
    return res.status(500).json({
  "success": false,
  "error": "Unauthorized, token missing or invalid"
})
  }

}

 const roleMiddleware =  (requiredRole)=>{
  return (req,res,next)=>{
    if(req.user.role !== requiredRole){
      return res.status(403).json({success:false,error:"Forbidden, teacher access required"});
    }
    next();
  }
}

module.exports = {authMiddleware,roleMiddleware}