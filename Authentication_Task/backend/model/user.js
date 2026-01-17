const {Schema ,model} = require("mongoose")

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String,
        unique:true
    },
    otp:String,
    otpExpiresAt: Date,
    isVerified:{
        type:Boolean,
        default:false
    },
    devices:[
        {
            token:String,
            loginAt:Date
        }
    ]

},
{timestamps:true}
)

module.exports = {
    UserModel : model("User",userSchema)
}