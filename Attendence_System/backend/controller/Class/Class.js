const { ClassModel } = require("../../models/Model");
const { classScheme } = require("../../validators/auth.scheme")


const createClass = async (req,res)=>{
    try{
        const parsed = classScheme.safeParse(req.body);
        if( ! parsed.success){
            return res.status(400).json({success:false,error:"Invalid request schema"})
        }
const {className} = parsed.data;

const newClass = await ClassModel.create({
    className,
    teacherId: req.user._id,
    studentIds :[]
})

return res.status(201).json({success:true,data:{
    _id:newClass._id,
    className:newClass.className,
    teacherId:newClass.teacherId,
    studentIds:newClass.studentIds
}})

    }catch(error){
        return res.status(500).json({success:false,error:error.message})
    }
}

module.exports = {createClass}