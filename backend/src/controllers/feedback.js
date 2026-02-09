const Feedback = require('../models/Feedback');
const Session = require('../models/Session');

// @desc    Give feedback for a session
// @route   POST /api/v1/feedback
// @access  Private (Mentor)
exports.giveFeedback = async (req, res, next) => {
    try {
        const { sessionId, rating, comments, tasksAssigned } = req.body;

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }

        if (session.mentor.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to give feedback for this session' });
        }

        const feedback = await Feedback.create({
            session: sessionId,
            mentor: req.user.id,
            student: session.student,
            rating,
            comments,
            tasksAssigned
        });

        // Update session with feedback reference
        session.feedback = feedback._id;
        session.status = 'completed';
        await session.save();

        res.status(201).json({
            success: true,
            data: feedback
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get student feedback
// @route   GET /api/v1/feedback
// @access  Private
exports.getFeedback = async (req, res, next) => {
    try {
        let query;
        if (req.user.role === 'mentor') {
            query = Feedback.find({ mentor: req.user.id }).populate('student', 'name');
        } else {
            query = Feedback.find({ student: req.user.id }).populate('mentor', 'name');
        }

        const feedbacks = await query.sort('-createdAt');

        res.status(200).json({
            success: true,
            count: feedbacks.length,
            data: feedbacks
        });
    } catch (err) {
        next(err);
    }
};
