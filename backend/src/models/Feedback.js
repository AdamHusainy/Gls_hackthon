const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.ObjectId,
        ref: 'Session',
        required: true
    },
    mentor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comments: String,
    tasksAssigned: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
