const Student = require('../models/user_student');
const {testCPF} = require('../utils/validators');
const errorMessages = require('../error_messages/error_messages');

async function createUserStudent(req, res) {
    try {
        const {cpf} = req.body;
        if(!testCPF(cpf)){
            return res.status(400).json({error:errorMessages.NOT_VALID_CPF});
        }
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getAllStudents(req, res) {
    try {
        const student = await Student.find().select('-id');
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getstudentById(req, res) {
    try {
        const student = await Student.findOne({ id: req.params.id }).select('-id');
        if (!student){
            return res.status(404).json({error:errorMessages.NOT_FOUND_USER});
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updatestudent(req, res) {
    try {
        const student = await Student.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!student) return res.status(404).send();
        res.status(200).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deletestudent(req, res) {
    try {
        const student = await Student.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!student) return res.status(404).send();
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUserStudent,
    getAllStudents,
    getstudentById,
    updatestudent,
    deletestudent
};
