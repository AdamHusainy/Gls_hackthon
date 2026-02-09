const User = require('../models/User');
const Availability = require('../models/Availability');
const Transaction = require('../models/Transaction');

// @desc    Update mentor profile
// @route   PUT /api/v1/mentors/profile
// @access  Private (Mentor)
exports.updateMentorProfile = async (req, res, next) => {
    try {
        const {
            name,
            email,
            expertise,
            bio,
            currentRole,
            company,
            location,
            experience,
            pricing
        } = req.body;

        // Build mentorProfile object
        const mentorProfileFields = {
            expertise,
            bio,
            currentRole,
            company,
            location,
            experience,
            pricing
        };

        // Find user first to get current mentorProfile and merge
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update root fields
        if (name) user.name = name;
        if (email) user.email = email;

        // Merge mentorProfile fields
        user.mentorProfile = { ...user.mentorProfile, ...mentorProfileFields };

        // Remove undefined fields
        Object.keys(user.mentorProfile).forEach(key => user.mentorProfile[key] === undefined && delete user.mentorProfile[key]);

        await user.save();

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all mentors
// @route   GET /api/v1/mentors
// @access  Public
exports.getMentors = async (req, res, next) => {
    try {
        const mentors = await User.find({ role: 'mentor' });

        res.status(200).json({
            success: true,
            count: mentors.length,
            data: mentors
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get mentor earnings
// @route   GET /api/v1/mentors/earnings
// @access  Private (Mentor)
exports.getEarnings = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ mentor: req.user.id });

        const totalEarnings = transactions.reduce((acc, curr) => acc + curr.amount, 0);

        res.status(200).json({
            success: true,
            data: {
                totalEarnings,
                transactions
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update availability
// @route   POST /api/v1/mentors/availability
// @access  Private (Mentor)
exports.updateAvailability = async (req, res, next) => {
    try {
        const { date, slots } = req.body;

        let availability = await Availability.findOne({ mentor: req.user.id, date });

        if (availability) {
            availability.slots = slots;
            await availability.save();
        } else {
            availability = await Availability.create({
                mentor: req.user.id,
                date,
                slots
            });
        }

        res.status(200).json({
            success: true,
            data: availability
        });
    } catch (err) {
        next(err);
    }
};
