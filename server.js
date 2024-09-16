const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const server = express();
const porta_server = process.env.PORT;
const students_routes = require('./routers/router_student');

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology: true });

server.use(bodyParser.json());
server.use('/aura/students');



server.listen(porta_server,()=> {
    console.log("O servidor está rodando na porta", porta_server);
    
})





