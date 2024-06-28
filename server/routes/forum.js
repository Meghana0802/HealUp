const express = require('express');
const router = express.Router();
const Discussion = require('../models/ForumPost');
const User = require('../models/User');

// GET discussions by topic
router.get('/:topic', async (req, res) => {
  const { topic } = req.params;
  try {
    const discussions = await Discussion.find({ topic });
    res.json({ data: discussions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new discussion question
router.post('/', async (req, res) => {
  const { topic, question, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const newDiscussion = new Discussion({ topic, question, user: user.name, comments: [] });
    await newDiscussion.save();
    res.json({ data: newDiscussion });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a comment to a discussion
router.post('/:discussionId/comments', async (req, res) => {
  const { discussionId } = req.params;
  const { userId, text } = req.body;
  try {
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const newComment = { user: user.name, text };
    discussion.comments.push(newComment);
    await discussion.save();
    res.json({ data: newComment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
