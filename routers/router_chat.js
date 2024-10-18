const express = require('express');
const { chatController } = require('../controllers/chatgpt_controller');

const router = express.Router();


router.post('/', chatController);

module.exports = router;
