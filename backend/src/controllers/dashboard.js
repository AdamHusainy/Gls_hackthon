const Roadmap = require('../models/Roadmap');
const Task = require('../models/Task');
const Feedback = require('../models/Feedback');
const Session = require('../models/Session');

// @desc    Get Student Dashboard Data
// @route   GET /api/v1/dashboard/student
// @access  Private (Student)
exports.getStudentDashboard = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 1. Roadmap Progress
        const roadmap = await Roadmap.findOne({ user: userId });
        let progress = 0;
        if (roadmap && roadmap.nodes) {
            const totalNodes = roadmap.nodes.length;
            const completedNodes = roadmap.nodes.filter(n => n.status === 'completed').length;
            progress = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;
        }

        // 2. Pending Tasks
        const tasks = await Task.find({ student: userId, status: 'pending' }).limit(3).sort('dueDate');

        // 3. Latest Feedback
        const feedback = await Feedback.findOne({ student: userId })
            .sort('-createdAt')
            .populate('mentor', 'name profileImage mentorProfile');

        // 4. Session Stats
        const sessions = await Session.find({ student: userId });
        const completedSessions = sessions.filter(s => s.status === 'completed');

        // Mock score logic (replace with real if available)
        const avgScore = completedSessions.length > 0 ?
            (completedSessions.reduce((acc, curr) => acc + (Math.random() * 2 + 8), 0) / completedSessions.length).toFixed(1)
            : 0;

        res.status(200).json({
            success: true,
            data: {
                progress,
                tasks,
                feedback: feedback ? {
                    id: feedback._id,
                    content: feedback.comments,
                    rating: feedback.rating,
                    mentor: feedback.mentor
                } : null,
                stats: {
                    completedSessions: completedSessions.length,
                    totalSessions: sessions.length,
                    avgScore
                }
            }
        });
    } catch (err) {
        next(err);
    }
};
