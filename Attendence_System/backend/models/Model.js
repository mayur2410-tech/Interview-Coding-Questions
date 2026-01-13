const { Schema, model } = require("mongoose");


// user model
const userSchema = new Schema({
    name: String,
    email: { tyep: String, unique: true },
    password: String,
    role: { enum: ["teacher", "student"] }
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
    status: { enum: ['present', "absent"] }
})

export const UserModel = model('Users', userSchema);
export const ClassModel = model('Class', classSchema);
export const AttendenceModel = model('Attendence', attendenceModel);