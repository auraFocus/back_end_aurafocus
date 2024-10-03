const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');


const user_student_schema = new mongoose.Schema({
    id:{type:String, default: uuidv4 , unique : true},
    name:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    cpf:{type:String, required:true, length:11},
    address: {
        street: { type: String, required: true },
        number: { type: Number, required: true }
    },
    phone:{type:String,required:true},
    parent_id:{type: String, ref: "Parent", required: true },
    role:{
        type:String,
        required:true,
        enum:['USER_STUDENDT','USER_B2B_ADMIN','USER_PARENT','USER_PLATFORM_N1','USER_PLATFORM_N2','USER_PLATFORM_ADMIN'],
        default:'USER_STUDENT'
    },
    school_id: { type: String, ref: "School", required: true } 
})


module.exports = mongoose.model('user_student', user_student_schema);

