const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const server = express();
const porta_server = process.env.PORT;
const students_routes = require('./routers/router_student');
const parents_routes = require('./routers/router_parents');
const user_b2b_admin_routes = require('./routers/router_b2b_admin');
const schools_routes = require('./routers/router_school');
const auth = require('./routers/router_auth');
const teachers_routes = require('./routers/router_teacher');




mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology: true });

server.use(bodyParser.json());
console.log("rotas montadas : /aura/students");

server.use('/aura/students', students_routes);
server.use('/aura/parents',parents_routes);
server.use('/aura/b2b_admin',user_b2b_admin_routes);
server.use('/aura/schools',schools_routes);
server.use('/aura/auth',auth);
server.use('/aura/teachers', teachers_routes)


server.listen(porta_server,()=> {
    console.log("O servidor está rodando na porta", porta_server);
    
})





