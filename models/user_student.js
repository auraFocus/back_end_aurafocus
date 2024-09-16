const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');


const user_student_schema = new mongoose.Schema({
    id:{type:String, default: uuidv4 , unique : true},
    name:{type:String, required:true},
    cpf:{type:String, required:true, length:11},
    address: {
        street: { type: String, required: true },
        number: { type: Number, required: true }
    },
    phone:{type:String,required:true},
    parent_id:{type:mongoose.Schema.Types.UUID, ref:"Parent", required:true}
})


module.exports = mongoose.model('user_student', user_student_schema);

