const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 1. Import your new bouncer
const authenticate = require('../middleware/auth');

// 2. Protect specific routes
// Anyone can view posts (GET), so no middleware there
router.get('/', postController.getPosts);

// Only logged-in users can create or delete (POST/DELETE)
router.post('/', authenticate, postController.createPost);
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;