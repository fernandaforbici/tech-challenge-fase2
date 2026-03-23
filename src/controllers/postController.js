const postService = require('../services/postServices');

const createPost = async (req, res, next) => {
    try {
        const result = await postService.createPost(req.body);
        return res.status(201).json(result);
    } catch (error) {
        next(error);

    }

}

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        return res.status(200).json(post);

    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const result = await postService.updatePost(req.params.id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res) => {
    try {
        const result = await postService.deletePost(req.params.id);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const searchPosts = async (req, res, next) => {
    try {

        const posts = await postService.searchPosts(req.query.q);
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts
};