const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Messages = require('../error_messages/messages');

const Userb2bAdmin = require('../models/user_b2b_admin');
const Parent = require('../models/user_parent');
const Student = require('../models/user_student');
const Teacher = require('../models/user_teacher');


async function findUserByUsername(username) {
    let user = await Userb2bAdmin.findOne({ username });
    if (user) return { user, role: 'b2b_admin' };

    user = await Parent.findOne({ username });
    if (user) return { user, role: 'parent' };

    user = await Student.findOne({ username });
    if (user) return { user, role: 'student' };

    user = await Teacher.findOne({ username });
    if (user) return { user, role: 'teacher' };

    return null; 
}


async function login(req, res) {
    const { username, password } = req.body;

    try {
       
        const result = await findUserByUsername(username);
        if (!result) {
            return res.status(404).send(Messages.NOT_FOUND_USER);
        }

        const { user, role } = result;
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send(Messages.INVALID_PASSWORD);
        }

        const payload = {
            id:user.id,
            role:role,
            school_id:user.school_id,
            name:user.name
        }
     
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '60m' } 
        );

        
        res.status(200).send({ message: Messages.SUCESSFUL_LOGIN, token });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = { login };
