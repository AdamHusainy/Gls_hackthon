const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    mentor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    dueDate: Date,
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    roadmapNodeId: String, // Optional: Link task to roadmap node
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);
