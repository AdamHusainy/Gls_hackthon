const express = require('express');
const {
    createRoadmap,
    getMyRoadmap,
    updateNodeStatus
} = require('../controllers/roadmaps');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.use(protect);

router.post('/generate', createRoadmap);
router.get('/my', getMyRoadmap);
router.put('/node', updateNodeStatus);

module.exports = router;
