const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all messages for current user
// @route   GET /api/v1/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user.id }, { recipient: req.user.id }]
        })
            .populate('sender', 'name profileImage')
            .populate('recipient', 'name profileImage')
            .sort('createdAt');

        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Send a message
// @route   POST /api/v1/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
    try {
        const { recipientId, content } = req.body;

        const message = await Message.create({
            sender: req.user.id,
            recipient: recipientId,
            content
        });

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', 'name profileImage')
            .populate('recipient', 'name profileImage');

        res.status(201).json({
            success: true,
            data: populatedMessage
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get conversation lists (grouped by user)
// @route   GET /api/v1/messages/conversations
// @access  Private
exports.getConversations = async (req, res, next) => {
    try {
        // This is a simplified version. Ideally use aggregation.
        // For now, fetch all messages and group in frontend or simple aggregation here.
        // Let's use simple aggregation to find unique interlocutors.

        const messages = await Message.find({
            $or: [{ sender: req.user.id }, { recipient: req.user.id }]
        }).sort('-createdAt').populate('sender', 'name profileImage').populate('recipient', 'name profileImage');

        const conversations = {};

        messages.forEach(msg => {
            const otherUser = msg.sender._id.toString() === req.user.id
                ? msg.recipient
                : msg.sender;

            if (!conversations[otherUser._id]) {
                conversations[otherUser._id] = {
                    user: otherUser,
                    lastMessage: msg,
                    unreadCount: 0
                };
            }

            if (msg.recipient._id.toString() === req.user.id && !msg.read) {
                conversations[otherUser._id].unreadCount++;
            }
        });

        const conversationList = Object.values(conversations).sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);

        res.status(200).json({
            success: true,
            data: conversationList
        });

    } catch (err) {
        next(err);
    }
};
