const express = require('express');
const router = express.Router();
const {
    createUserparent,
    getAllparents,
    getparentById,
    updateparent,
    deleteparent
} = require('../controllers/controller_parent');

router.post('/create_parent', createUserparent);
router.get('/all_parents', getAllparents);
router.get('/get_parent/:id', getparentById);
router.patch('/update_parent/:id', updateparent);
router.delete('/delete_parent/:id', deleteparent);

module.exports = router;
