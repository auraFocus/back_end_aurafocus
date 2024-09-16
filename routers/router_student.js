const express = require('express');
const router = express.Router();
const {
    createUserStudent,
    getAllStudents,
    getstudentById,
    updatestudent,
    deletestudent
} = require('../controllers/controller_student');

router.post('/create_customer', createUserStudent);
router.get('/all_customers', getAllStudents);
router.get('/get_customer/:id', getstudentById);
router.patch('/update_customer/:id', updatestudent);
router.delete('/delete_customer/:id', deletestudent);

module.exports = router;
