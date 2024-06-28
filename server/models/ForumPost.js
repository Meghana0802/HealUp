const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: String, required: true }, 
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const DiscussionSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    question: { type: String, required: true },
    user: { type: String, required: true }, 
    comments: [CommentSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
