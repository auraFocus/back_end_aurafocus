const Userb2bAdmin = require('../models/user_b2b_admin');
const {testCPF} = require('../utils/validator_cpf');
const errorMessages = require('../error_messages/error_messages');

async function createB2Badminuser(req, res) {
    try {
        const {cpf} = req.body;
        if(!testCPF(cpf)){
            return res.status(400).json({error:errorMessages.NOT_VALID_CPF});
        }
        const user_b2b_admin = new Userb2bAdmin(req.body);
        await user_b2b_admin.save();
        res.status(201).send(user_b2b_admin);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getAllB2Badmin(req, res) {
    try {
        const user_b2b_admin = await Userb2bAdmin.find().select('-id');
        res.status(200).send(user_b2b_admin);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getuserb2bAdminById(req, res) {
    try {
        const user_b2b_admin = await Userb2bAdmin.findOne({ id: req.params.id }).select('-id');
        if (!user_b2b_admin){
            return res.status(404).json({error:errorMessages.NOT_FOUND_USER});
        }
        res.status(200).send(user_b2b_admin);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateb2bAdmin(req, res) {
    try {
        const user_b2b_admin = await Userb2bAdmin.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!user_b2b_admin) return res.status(404).send();
        res.status(200).send(user_b2b_admin);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteb2bAdmin(req, res) {
    try {
        const user_b2b_admin = await Userb2bAdmin.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!user_b2b_admin) return res.status(404).send();
        res.status(200).send(user_b2b_admin);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createB2Badminuser,
    getAllB2Badmin,
    getuserb2bAdminById,
    updateb2bAdmin,
    deleteb2bAdmin
};
