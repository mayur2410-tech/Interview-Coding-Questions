const { success } = require("zod");
const { ClassModel, UserModel } = require("../../models/Model");
const { classScheme, addStudentSchema } = require("../../validators/auth.scheme")


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

const addStudent = async (req,res)=>{
    try{

        const parsed = addStudentSchema.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json({success:false,error:"Invalid request schema"})
        }

        const {studentIds} = parsed.data
        const classId = req.params.id;
        // console.log("classid",classId)

        const classDB = await ClassModel.findById(classId);
        if(!classDB){
            return res.status(404).json({success:false,error:"Class not found"})
        }

        //check wheter the teacher create class is going to add the student he own or not
        if(classDB.teacherId.toString() !== req.user._id.toString()){
            return res.status(403).json({success:false,error:"Forbidden, not class teacher"})
        }

        const student = await UserModel.findById(studentIds);
        if(!student){
           return res.status(404).json({success:false,error:"Student not found"})
        }

        if(student.role !== "student"){
            return res.status(400).json({success:false,erro:"user is not Student"})
        }

        if(classDB.studentIds.includes(studentIds)){
            return res.status(400).json({success:false,error:"User already Present"});
        }

        classDB.studentIds.push(studentIds);
        await classDB.save();

        return res.status(200).json({success:true,classDB})


    }catch(error){
        return res.status(500).json({success:false,error:error.message})
    }
}

module.exports = {createClass,addStudent}