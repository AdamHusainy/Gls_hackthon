const express = require('express');
const { getMessages, sendMessage, getConversations } = require('../controllers/messages');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.get('/', getMessages);
router.post('/', sendMessage);
router.get('/conversations', getConversations);

module.exports = router;
