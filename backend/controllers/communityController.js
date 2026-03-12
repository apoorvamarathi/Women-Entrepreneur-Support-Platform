const ForumPost = require('../models/ForumPost');

// @desc    Get all community posts
// @route   GET /api/community/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    
    // Map them for the frontend
    const mappedPosts = posts.map(post => ({
      id: post._id,
      user: post.userId?.name || 'Unknown User',
      text: post.text,
      replies: post.repliesInfo,
      // Just a simple date for now, can be improved with date-fns/moment on the frontend
      time: new Date(post.createdAt).toLocaleDateString()
    }));

    res.status(200).json(mappedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/community/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Post text is required' });
    }

    const post = await ForumPost.create({
      userId: req.user.id,
      text
    });

    res.status(201).json({
      id: post._id,
      user: req.user.name,
      text: post.text,
      replies: post.repliesInfo,
      time: new Date(post.createdAt).toLocaleDateString()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost
};
