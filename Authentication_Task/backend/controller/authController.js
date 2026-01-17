const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user");
const { sendOtpService } = require("../services/msg91");
const { sendOtpSchema, registerSchema, verifyOtpSchema } = require("../validators/user.schema")


const sendOtp = async (req,res)=>{
    try{

        const parsed = sendOtpSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({success:false,error:"Invalid request schema"})
        }

        const {phone} = parsed.data;

        const user = await UserModel.findOne({phone});
        if(!user){
            return res.status(404).json({success:false,error:"User not register"});
        }
        
        const otp = Math.floor(100000 + Math.random()* 900000).toString();
        const otpExpireIn = new Date(Date.now()+2*60*1000);

        //now save in database otp and otpExpire time 
        user.otp = otp;
        user.otpExpiresAt = otpExpireIn
        await user.save();

        await sendOtpService(phone,otp)
        return res.status(200).json({success:true,message:"Otp send Successfully"})

        //here we called the function in which we pass the number and otp he will send after it we will send the return message successfully send;
         

    }catch(error){
        return res.status(500).json({success:false,error:error.message})
    }
}

const registerUser = async (req,res)=>{
try{

    const parsed = registerSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({success:false,error:"Invalid request schema"})
    }

    const {name,phone,email} = parsed.data
    const existUser = await UserModel.findOne({
        $or:[{phone} ,{email}]
    })

    if(existUser){
     return res.status(400).json({success:false,error:"User already register"});
    }

   const newUser =  await UserModel.create({
        name,
        email,
        phone,
        isVerified:false
    })

    return res.status(201).json({success:true,data: {
  id: newUser._id,
  name: newUser.name,
  phone: newUser.phone,
  email: newUser.email
}
})

}catch(error){
        return res.status(500).json({success:false,error:error.message})
    }
}

const verifyOtp = async (req,res)=>{
    try{

        const parsed = verifyOtpSchema.safeParse(req.body)
        if(!parsed.success){
          return res.status(400).json({success:false,error:"Invalid request schema"})
        }

        const {phone , otp} = parsed.data;
        const user = await UserModel.findOne({phone})
        if(!user){
            return res.status(404).json({success:false,error:"User not found"})
        }

        if(user.otp !== otp){
            return res.status(400).json({success:false,error:"Invalid otp"});
        }

        const currentTime = new Date();
        if(user.otpExpiresAt < currentTime){
            return res.status(400).json({success:false,error:"Otp get expired"})
        }
        
         user.isVerified = true;
         user.otp = null;
         user.otpExpiresAt = null;
         await user.save();

         const token = jwt.sign({token:user._id}, process.env.JWT_SECRET, {expiresIn:'30d'})
        
        return res.status(200).json({success:true,message:"otp verify successfully",data:token})


    }catch(error){
        return res.status(500).json({success:false,error:error.message})
    }
}

module.exports = {sendOtp,registerUser,verifyOtp};