const express = require('express');
const { getStudentDashboard } = require('../controllers/dashboard');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);

router.get('/student', getStudentDashboard);

module.exports = router;
