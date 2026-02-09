const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    nodes: [
        {
            id: String,
            title: String,
            status: {
                type: String,
                enum: ['completed', 'in-progress', 'locked', 'skipped'],
                default: 'locked'
            },
            subNodes: [
                {
                    id: String,
                    title: String,
                    status: {
                        type: String,
                        enum: ['completed', 'in-progress', 'locked', 'skipped'],
                        default: 'locked'
                    },
                    weak: Boolean,
                    resources: [
                        {
                            title: String,
                            type: {
                                type: String,
                                enum: ['video', 'article', 'game']
                            },
                            url: String
                        }
                    ]
                }
            ]
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
