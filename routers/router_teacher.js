const express = require('express');
const router = express.Router();
const {
    createUserTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require('../controllers/controller_teacher');

router.post('/create_teacher', createUserTeacher);
router.get('/all_teachers', getAllTeachers);
router.get('/get_teacher/:id', getTeacherById);
router.patch('/update_teacher/:id', updateTeacher);
router.delete('/delete_teacher/:id', deleteTeacher);

module.exports = router;
