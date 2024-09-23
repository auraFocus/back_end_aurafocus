const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');


const School = new mongoose.Schema({
    id:{type:String, default: uuidv4 , unique : true},
    name:{type:String, required:true},
    address: {
        street: { type: String, required: true },
        number: { type: Number, required: true }
    }
})


module.exports = mongoose.model('School', School);
