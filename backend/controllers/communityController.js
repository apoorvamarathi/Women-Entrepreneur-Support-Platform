const ForumPost = require('../models/ForumPost');

// sample static groups data mirrored from frontend mock
const staticGroups = [
  { id: 1, name: "Tech Startup Group", members: 234, description: "For women in tech startups" },
  { id: 2, name: "Women Founder Network", members: 567, description: "Connect with women founders" },
  { id: 3, name: "Startup Mentorship Circle", members: 189, description: "Find mentors and mentees" },
];

// @desc    Get all community posts
// @route   GET /api/community/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate('userId', 'name email')
      .populate('replies.userId', 'name email')
      .sort({ createdAt: -1 });
    
    // Map them for the frontend
    const mappedPosts = posts.map(post => ({
      id: post._id,
      user: post.userId?.name || 'Unknown User',
      text: post.text,
      replies: post.replies || [],
      repliesCount: post.replies ? post.replies.length : 0,
      time: new Date(post.createdAt).toLocaleDateString()
    }));

    res.status(200).json(mappedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get networking groups (static for now)
// @route   GET /api/community/groups
// @access  Private
const getGroups = async (req, res) => {
  try {
    res.status(200).json(staticGroups);
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

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Post text is required' });
    }

    const post = await ForumPost.create({
      userId: req.user.id,
      text
    });

    const populatedPost = await post.populate('userId', 'name email');

    res.status(201).json({
      id: populatedPost._id,
      user: req.user.name,
      text: populatedPost.text,
      replies: [],
      repliesCount: 0,
      time: new Date(populatedPost.createdAt).toLocaleDateString()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply to a post
// @route   POST /api/community/posts/:id/reply
// @access  Private
const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Reply text is required' });
    }

    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.replies.push({
      userId: req.user.id,
      text
    });
    post.repliesInfo = post.replies.length;

    await post.save();
    const populatedPost = await post.populate('replies.userId', 'name email');

    res.status(201).json({
      id: populatedPost._id,
      replies: populatedPost.replies,
      repliesCount: populatedPost.replies.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  getGroups,
  createPost,
  replyToPost
};
