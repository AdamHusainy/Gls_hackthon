const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true
    },
    session: {
        type: mongoose.Schema.ObjectId,
        ref: 'Session'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
