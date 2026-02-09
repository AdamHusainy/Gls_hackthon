const Roadmap = require('../models/Roadmap');
const User = require('../models/User');
const { generateRoadmap } = require('../services/gemini');

// @desc    Generate a new roadmap
// @route   POST /api/v1/roadmaps/generate
// @access  Private (Student)
exports.createRoadmap = async (req, res, next) => {
    try {
        const { goals } = req.body;

        if (!goals) {
            return res.status(400).json({ success: false, message: 'Please provide goals' });
        }

        // Call AI service
        const roadmapData = await generateRoadmap(goals);

        // Save to DB
        const roadmap = await Roadmap.create({
            user: req.user.id,
            title: roadmapData.title,
            nodes: roadmapData.nodes
        });

        // Update user's current roadmap
        await User.findByIdAndUpdate(req.user.id, {
            'studentProfile.currentRoadmap': roadmap._id,
            'studentProfile.goals': goals
        });

        res.status(201).json({
            success: true,
            data: roadmap
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get current user's roadmap
// @route   GET /api/v1/roadmaps/my
// @access  Private (Student)
exports.getMyRoadmap = async (req, res, next) => {
    try {
        const roadmap = await Roadmap.findOne({ user: req.user.id }).sort('-createdAt');

        if (!roadmap) {
            return res.status(404).json({ success: false, message: 'No roadmap found' });
        }

        res.status(200).json({
            success: true,
            data: roadmap
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update roadmap node status
// @route   PUT /api/v1/roadmaps/node/:id
// @access  Private (Student)
exports.updateNodeStatus = async (req, res, next) => {
    try {
        const { status, nodeId, subNodeId } = req.body;

        const roadmap = await Roadmap.findOne({ user: req.user.id });

        if (!roadmap) {
            return res.status(404).json({ success: false, message: 'Roadmap not found' });
        }

        // Find and update node/subnode
        roadmap.nodes = roadmap.nodes.map(node => {
            if (node.id === nodeId) {
                if (subNodeId) {
                    node.subNodes = node.subNodes.map(sub => {
                        if (sub.id === subNodeId) {
                            sub.status = status;
                        }
                        return sub;
                    });
                } else {
                    node.status = status;
                }
            }
            return node;
        });

        await roadmap.save();

        res.status(200).json({
            success: true,
            data: roadmap
        });
    } catch (err) {
        next(err);
    }
};
