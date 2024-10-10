const Teacher = require('../models/user_teacher');
const {testCPF} = require('../utils/validator_cpf');
const Messages = require('../error_messages/messages');
const bcrypt = require('bcrypt');




async function createUserTeacher(req, res) {
    try {
        const {cpf,password} = req.body;

        if(!testCPF(cpf)){
            return res.status(400).json({error:Messages.NOT_VALID_CPF});
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const teacher = new Teacher({
            ...req.body,
            password:hashPassword
        });

        await teacher.save();
        res.status(201).send({message: Messages.CREATED_USER , teacher});

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getAllTeachers(req, res) {
    try {
        const {id, name , cpf, email} = req.query;
    
        let filter = {};
        if (id) filter.id = new RegExp(id, 'i');
        if (name) filter.name = new RegExp(name, 'i');
        if (cpf) filter.cpf = cpf;
        if (email) filter.username = new RegExp(email, 'i'); 


        const teachers = await Teacher.find(filter).select('_id id name cpf address phone role school_id');
        res.status(200).send(teachers);
    } catch (error) {
        console.log(error);
        
        res.status(500).send(error);
    }
}

async function getTeacherById(req, res) {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id }).select('-id');
        if (!teacher) {
            return res.status(404).json({error: Messages.NOT_FOUND_USER});
        }
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateTeacher(req, res) {
    try {
        const teacher = await Teacher.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!teacher) return res.status(404).send();
        res.status(200).send(teacher);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteTeacher(req, res) {
    try {
        const teacher = await Teacher.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!teacher) return res.status(404).send();
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUserTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};
