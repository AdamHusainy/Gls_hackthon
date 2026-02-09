const express = require('express');
const { updateProfile, getDashboard } = require('../controllers/users');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

router.use(protect);

router.put('/profile', updateProfile);
router.get('/dashboard', authorize('user'), getDashboard);

module.exports = router;
