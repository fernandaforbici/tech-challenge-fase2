const postRepository = require('../repositories/postRepository');
const AppError = require('../utils/AppError');

const validateRequiredFields = ({ title, content, author }) => {
    if (!title || !content || !author) {
        throw new AppError('Todos os campos são obrigatórios', 400);
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
        throw new AppError('Post não encontrado.', 404);
    }
    return post;
};

const updatePost = async (id, { title, content, author }) => {
    validateRequiredFields({ title, content, author });
    const post = await postRepository.update(id, { title, content, author });
    if (!post) {
        throw new AppError('Post não encontrado.', 404);
    }
    return {
        message: 'Post atualizado com sucesso.',
        post
    };
};

const deletePost = async (id) => {
    const post = await postRepository.remove(id);
    if (!post) {
        throw new AppError('Post não encontrado.', 404);
    }
    return {
        message: 'Post excluído com sucesso.',
        post
    };
};

const searchPosts = async (term) => {
    console.log('Termo de busca:', term);
    const normalizedTerm = term ? term.trim() : '';
    if (!normalizedTerm) {
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

