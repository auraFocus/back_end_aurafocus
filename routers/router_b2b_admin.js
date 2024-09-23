const express = require('express');
const router = express.Router();
const {
    login,
    createB2Badminuser,
    getAllB2Badmin,
    getuserb2bAdminById,
    updateb2bAdmin,
    deleteb2bAdmin
} = require('../controllers/controller_b2b_admin');

router.post('/create_b2badmin', createB2Badminuser);
router.get('/all_b2badmin', getAllB2Badmin);
router.get('/get_b2b_admin/:id', getuserb2bAdminById);
router.patch('/update_b2b_admin/:id', updateb2bAdmin);
router.delete('/delete_b2b_admin/:id', deleteb2bAdmin);

module.exports = router;
