const Session = require('../models/Session');
const Availability = require('../models/Availability');
const User = require('../models/User');

// @desc    Book a session
// @route   POST /api/v1/sessions
// @access  Private (Student)
exports.bookSession = async (req, res, next) => {
    try {
        const { mentorId, startTime, endTime, date, slotIndex } = req.body;

        // Check availability
        const availability = await Availability.findOne({ mentor: mentorId, date });
        if (!availability || availability.slots[slotIndex].isBooked) {
            return res.status(400).json({ success: false, message: 'Slot not available' });
        }

        // Create session
        const session = await Session.create({
            mentor: mentorId,
            student: req.user.id,
            startTime,
            endTime,
            status: 'scheduled'
        });

        // Mark slot as booked
        availability.slots[slotIndex].isBooked = true;
        await availability.save();

        res.status(201).json({
            success: true,
            data: session
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get user sessions
// @route   GET /api/v1/sessions
// @access  Private
exports.getSessions = async (req, res, next) => {
    try {
        let query;
        if (req.user.role === 'mentor') {
            query = Session.find({ mentor: req.user.id }).populate('student', 'name email');
        } else {
            query = Session.find({ student: req.user.id }).populate('mentor', 'name mentorProfile');
        }

        const sessions = await query.sort('-startTime');

        res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update session status
// @route   PUT /api/v1/sessions/:id
// @access  Private
exports.updateSession = async (req, res, next) => {
    try {
        let session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }

        // Make sure user is either mentor or student of this session
        if (session.mentor.toString() !== req.user.id && session.student.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        session = await Session.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: session
        });
    } catch (err) {
        next(err);
    }
};
