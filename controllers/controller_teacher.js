const Teacher = require('../models/user_teacher');
const {testCPF} = require('../utils/validator_cpf');
const errorMessages = require('../error_messages/error_messages');

async function createUserTeacher(req, res) {
    try {
        const {cpf} = req.body;
        if (!testCPF(cpf)) {
            return res.status(400).json({error: errorMessages.NOT_VALID_CPF});
        }
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).send(teacher);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function getAllTeachers(req, res) {
    try {
        const teachers = await Teacher.find().select('-id');
        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getTeacherById(req, res) {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id }).select('-id');
        if (!teacher) {
            return res.status(404).json({error: errorMessages.NOT_FOUND_USER});
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
