const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // String format 'YYYY-MM-DD' for simplicity
        required: true
    },
    slots: [
        {
            startTime: String, // 'HH:mm'
            endTime: String,
            isBooked: {
                type: Boolean,
                default: false
            }
        }
    ]
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
