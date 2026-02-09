const express = require('express');

const { chat, generateRoadmap } = require('../controllers/ai');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.post('/chat', chat);
router.post('/roadmap', generateRoadmap);

module.exports = router;
