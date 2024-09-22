const express = require('express');
const router = express.Router();
const {
    createSchool,
    getallschools,
    getschoolbyID,
    updateSchool,
    deleteSchool,

} = require('../controllers/controller_school');

router.post('/create_school', createSchool);
router.get('/all_schools', getallschools);
router.get('/get_school/:id', getschoolbyID);
router.patch('/update_school/:id', updateSchool);
router.delete('/delete_school/:id', deleteSchool);

module.exports = router;
