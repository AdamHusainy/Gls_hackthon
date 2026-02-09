const { chatWithMentor } = require('../services/gemini');

// @desc    Chat with AI Mentor
// @route   POST /api/v1/ai/chat
// @access  Private
exports.chat = async (req, res, next) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Please provide a message' });
        }

        const response = await chatWithMentor(message, history || []);

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (err) {
        next(err);
    }
};
// @desc    Generate Roadmap
// @route   POST /api/v1/ai/roadmap
// @access  Private
exports.generateRoadmap = async (req, res, next) => {
    try {
        const { goals } = req.body;

        if (!goals) {
            return res.status(400).json({ success: false, message: 'Please provide goals' });
        }

        const roadmap = await require('../services/gemini').generateRoadmap(goals);

        res.status(200).json({
            success: true,
            data: roadmap
        });
    } catch (err) {
        next(err);
    }
};
