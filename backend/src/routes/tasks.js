const express = require('express');
const {
    assignTask,
    getTasks,
    updateTask
} = require('../controllers/tasks');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router.route('/')
    .get(getTasks)
    .post(assignTask);

router.route('/:id')
    .put(updateTask);

module.exports = router;
