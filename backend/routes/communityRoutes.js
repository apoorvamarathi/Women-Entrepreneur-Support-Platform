const express = require('express');
const router = express.Router();
const { getPosts, createPost, replyToPost, getGroups } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/posts', protect, getPosts);
router.post('/posts', protect, createPost);
router.post('/posts/:id/reply', protect, replyToPost);
router.get('/groups', protect, getGroups);

module.exports = router;
