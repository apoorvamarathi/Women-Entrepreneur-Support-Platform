const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/posts', protect, getPosts);
router.post('/posts', protect, createPost);

module.exports = router;
