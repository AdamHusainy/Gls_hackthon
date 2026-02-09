const express = require('express');
const {
    updateMentorProfile,
    getMentors,
    getEarnings,
    updateAvailability
} = require('../controllers/mentors');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

router.get('/', getMentors);

router.use(protect);
router.use(authorize('mentor'));

router.put('/profile', updateMentorProfile);
router.get('/earnings', getEarnings);
router.post('/availability', updateAvailability);

module.exports = router;
