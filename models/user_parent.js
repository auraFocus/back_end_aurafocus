const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');


const user_parent_schema = new mongoose.Schema({
    
    id:{type:String, default: uuidv4 , unique : true},
    name:{type:String, required:true},
    cpf:{type:String, required:true, length:11},
    address: {
        street: { type: String, required: true },
        number: { type: Number, required: true }
    },
    phone:{type:String,required:true},

})

module.exports = mongoose.model('user_parent', user_parent_schema);