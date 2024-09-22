const School = require('../models/school');
const errorMessages = require('../error_messages/error_messages');

async function createSchool(req, res) {
    try {
        const school = new School(req.body);
        await school.save();
        res.status(201).send(school);
        console.log("ESCOLA CRIADA :",school);
        

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

async function getallschools(req, res) {
    try {
        const schools = await Parent.find().select('-id');
        res.status(200).send(schools);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getschoolbyID(req, res) {
    try {
        const school = await Parent.findOne({ id: req.params.id }).select('-id');
        if (!school){
            return res.status(404).json({error:errorMessages.NOT_FOUND_USER});
        }
        res.status(200).send(school);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateSchool(req, res) {
    try {
        const school = await Parent.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-_id');
        if (!school) return res.status(404).send();
        res.status(200).send(school);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteSchool(req, res) {
    try {
        const school = await Parent.findOneAndDelete({ id: req.params.id }).select('-id');
        if (!school) return res.status(404).send();
        res.status(200).send(school);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createSchool,
    getallschools,
    getschoolbyID,
    updateSchool,
    deleteSchool
};
