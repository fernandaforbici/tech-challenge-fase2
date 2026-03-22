const express = require('express');
const router = express.Router();

const { createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
} = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;