const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const server = express();
const porta_server = process.env.PORT;

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology: true });

server.use(bodyParser.json());

server.listen(porta_server,()=> {
    console.log("O servidor está rodando na porta", porta_server);
    
})





