const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
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
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    topic: String,
    roomUrl: String, // For virtual meetings
    feedback: {
        type: mongoose.Schema.ObjectId,
        ref: 'Feedback'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Session', SessionSchema);
