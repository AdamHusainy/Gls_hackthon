const express = require('express');
const {
    bookSession,
    getSessions,
    updateSession
} = require('../controllers/sessions');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router.route('/')
    .get(getSessions)
    .post(bookSession);

router.route('/:id')
    .put(updateSession);

module.exports = router;
