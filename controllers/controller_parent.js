const Parent = require('../models/user_parent');
const {testCPF} = require('../utils/validator_cpf');
const Messages = require('../error_messages/messages');
const bcrypt = require('bcrypt');
async function createUserparent(req, res) {
    try {
        const {cpf,password} = req.body;
        if(!testCPF(cpf)){
            return res.status(400).json({error:errorMessages.NOT_VALID_CPF});
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user_parent = new Parent({
            ...req.body,
            password:hashPassword
        });

        await user_parent.save();
        res.status(201).send({message: Messages.CREATED_USER , user_parent});
      
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getAllparents(req, res) {
    try {
        const { id,name, cpf, email } = req.query; 

       
        let filter = {};
        if (id) filter.id = new RegExp(id, 'i');
        if (name) filter.name = new RegExp(name, 'i');
        if (cpf) filter.cpf = cpf;
        if (email) filter.username = new RegExp(email, 'i'); 

        const parents = await Parent.find(filter).select('_id id name cpf address phone role school_id');
        res.status(200).send(parents);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getparentById(req, res) {
    try {
        const parent = await Parent.findOne({ id: req.params.id }).select('-id');
        if (!parent){
            return res.status(404).json({error:errorMessages.NOT_FOUND_USER});
        }
        res.status(200).send(parent);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateparent(req, res) {
    try {
        const parent = await Parent.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!parent) return res.status(404).send();
        res.status(200).send(parent);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteparent(req, res) {
    try {
        const parent = await Parent.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!parent) return res.status(404).send();
        res.status(200).send(parent);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUserparent,
    getAllparents,
    getparentById,
    updateparent,
    deleteparent
};
