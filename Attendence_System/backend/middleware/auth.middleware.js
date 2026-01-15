const { UserModel } = require("../models/Model");


const  authMiddleware = async (req,res,next)=>{
  try{

    const token = req.headers.authentication
    if(!token){
        return res.status(401).json({success:false,error:"Unauthorized, token missing or invalid"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

module.exports = authMiddleware