const Parent = require('../models/user_parent');
const {testCPF} = require('../utils/validator_cpf');
const errorMessages = require('../error_messages/error_messages');

async function createUserparent(req, res) {
    try {
        const {cpf} = req.body;
        if(!testCPF(cpf)){
            return res.status(400).json({error:errorMessages.NOT_VALID_CPF});
        }
        const parent = new Parent(req.body);
        await parent.save();
        res.status(201).send(parent);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getAllparents(req, res) {
    try {
        const parents = await Parent.find().select('-id');
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
