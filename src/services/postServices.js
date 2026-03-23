const postRepository = require('../repositories/postRepository');

const validateRequiredFields = ({ title, content, author }) => {
    if (!title || !content || !author) {
        const error = new Error('Todos os campos são obrigatórios');
        error.statusCode = 400;
        throw error;
    }
};

const createPost = async ({ title, content, author }) => {
    validateRequiredFields({ title, content, author });

    const post = await postRepository.create({ title, content, author });
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
    const post = await postRepository.findById(id);
    if (!post) {
        const error = new Error('Post não encontrado.');
        error.statusCode = 404;
        throw error;
    }
    return post;
};

const updatePost = async (id, { title, content, author }) => {
    validateRequiredFields({ title, content, author });
    const post = await postRepository.update(id, { title, content, author });
    if (!post) {
        const error = new Error('Post não encontrado.');
        error.statusCode = 404;
        throw error;
    }
    return {
        message: 'Post atualizado com sucesso.',
        post
    };
};

const deletePost = async (id) => {
    const post = await postRepository.remove(id);
    if (!post) {
        const error = new Error('Post não encontrado.');
        error.statusCode = 404;
        throw error;
    }
    return {
        message: 'Post excluído com sucesso.',
        post
    };
};

const searchPosts = async (term) => {
    if (!term) {
        const error = new Error('Parâmetro de busca é obrigatório.');
        error.statusCode = 400;
        throw error;
    }
    return await postRepository.search(term);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts
};

