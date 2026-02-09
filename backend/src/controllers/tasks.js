const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Assign task to student
// @route   POST /api/v1/tasks
// @access  Private (Mentor)
exports.assignTask = async (req, res, next) => {
    try {
        const { studentId, title, description, dueDate, roadmapNodeId } = req.body;

        const task = await Task.create({
            student: studentId,
            mentor: req.user.id,
            title,
            description,
            dueDate,
            roadmapNodeId
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get student tasks
// @route   GET /api/v1/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
    try {
        let query;
        if (req.user.role === 'mentor') {
            query = Task.find({ mentor: req.user.id }).populate('student', 'name');
        } else {
            query = Task.find({ student: req.user.id }).populate('mentor', 'name');
        }

        const tasks = await query.sort('-createdAt');

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update task status
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Only student can complete task, mentor can edit details
        if (req.user.role === 'user' && task.student.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};
