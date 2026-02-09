const express = require('express');
const {
    giveFeedback,
    getFeedback
} = require('../controllers/feedback');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router.route('/')
    .get(getFeedback)
    .post(giveFeedback);

module.exports = router;
