const express = require('express');
const router = express.Router();
const {
    createUserStudent,
    getAllStudents,
    getstudentById,
    updatestudent,
    deletestudent
} = require('../controllers/controller_student');

router.post('/create_student', createUserStudent);
router.get('/all_students', getAllStudents);
router.get('/get_student/:id', getstudentById);
router.patch('/update_student/:id', updatestudent);
router.delete('/delete_student/:id', deletestudent);

module.exports = router;
