const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            profileImage: req.body.profileImage
        };

        if (req.user.role === 'user' && req.body.goals) {
            fieldsToUpdate.studentProfile = {
                ...req.user.studentProfile,
                goals: req.body.goals
            };
        }

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get dashboard data
// @route   GET /api/v1/users/dashboard
// @access  Private (Student)
exports.getDashboard = async (req, res, next) => {
    try {
        // Find user with populated roadmap and tasks
        const user = await User.findById(req.user.id)
            .populate('studentProfile.currentRoadmap')
            .populate('studentProfile.completedTasks');

        res.status(200).json({
            success: true,
            data: {
                studentProfile: user.studentProfile,
                // Add more aggregated data if needed
            }
        });
    } catch (err) {
        next(err);
    }
};
