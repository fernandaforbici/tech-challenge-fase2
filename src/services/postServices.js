const postRepository = require('../repositories/postRepository');
const AppError = require('../utils/AppError');
const logger = require('../config/logger');

const validateRequiredFields = ({ title, content, author }) => {
    if (!title || !content || !author) {
        throw new AppError('Todos os campos são obrigatórios', 400);
    }
};

const createPost = async ({ title, content, author }) => {
    validateRequiredFields({ title, content, author });

    logger.info({
        action: 'create_post_attempt',
        author,
        title
    }, 'Tentando criar post');

    const post = await postRepository.create({
        title: title.trim(),
        content: content.trim(),
        author: author.trim()
    });
    logger.info({
        action: 'create_post_success',
        postId: post.id
    }, 'Post criado com sucesso');

    return {
        message: 'Post criado com sucesso.',
        post
    };
};

const getAllPosts = async () => {
    const posts = await postRepository.findAll();
    return posts;
};

const getPostById = async (id) => {
    logger.info({
        action: 'get_post_by_id',
        postId: id
    }, 'Tentando buscar post por ID');
    const post = await postRepository.findById(id);
    if (!post) {
        logger.warn({
            action: 'get_post_by_id_not_found',
            postId: id
        }, 'Post não encontrado por ID');
        throw new AppError('Post não encontrado.', 404);
    }
    return post;
};

const updatePost = async (id, { title, content, author }) => {
    validateRequiredFields({ title, content, author });
    logger.info({
        action: 'update_post_attempt',
        postId: id,
        title
    }, 'Tentando atualizar post');

    const post = await postRepository.update(id, {
        title: title.trim(),
        content: content.trim(),
        author: author.trim()
    });
    if (!post) {
        logger.warn({
            action: 'update_post_not_found',
            postId: id
        }, 'Post não encontrado para atualização');
        throw new AppError('Post não encontrado.', 404);
    }
    logger.info({
        action: 'update_post_success',
        postId: id
    }, 'Post atualizado com sucesso');
    return {
        message: 'Post atualizado com sucesso.',
        post
    };
};

const deletePost = async (id) => {
    logger.warn({
        action: 'delete_post_attempt',
        postId: id
    }, 'Tentando excluir post');
    const post = await postRepository.remove(id);
    if (!post) {
        logger.warn({
            action: 'delete_post_not_found',
            postId: id
        }, 'Post não encontrado para exclusão');
        throw new AppError('Post não encontrado.', 404);
    }
    logger.warn({
        action: 'delete_post_success',
        postId: id
    }, 'Post excluído com sucesso');
    return {
        message: 'Post excluído com sucesso.',
        post
    };
};

const searchPosts = async (term) => {
    logger.info({
        action: 'search_posts',
        term
    }, 'Tentando buscar posts');
    const normalizedTerm = term ? term.trim() : '';
    if (!normalizedTerm) {
        logger.warn({
            action: 'search_posts_no_term'
        }, 'Termo de busca vazio');
        throw new AppError('Parâmetro de busca é obrigatório.', 400);
    }
    return await postRepository.search(normalizedTerm);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts
};

