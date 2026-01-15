const { Schema, model } = require("mongoose");


// user model
const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type:String ,enum: ["teacher", "student"] }
})



// Class Model

const classSchema = new Schema({
    className: String,
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    studentIds: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }]

})

const attendenceModel = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: "Class" },
    studentId: { type: Schema.Types.ObjectId, ref: "Users" },
    status: { type:String,enum: ['present', "absent"] }
})

module.exports={

    UserModel : model('Users', userSchema),
    ClassModel :  model('Class', classSchema),
    AttendenceModel  : model('Attendence', attendenceModel) 
}
