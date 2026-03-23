const postRepository = require('../repositories/postRepository');

const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const post = await postRepository.create({ title, content, author });

        return res.status(201).json({ message: 'Post criado com sucesso.', post });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        return res.status(500).json({ error: 'Erro interno ao criar post.' });

    }

}
const getAllPosts = async (req, res) => {
    try {
        const posts = await postRepository.findAll();
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar posts.' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postRepository.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error('Erro ao buscar post por id:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar post.' });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        const post = await postRepository.update(id, { title, content, author });

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        return res.status(200).json({
            message: 'Post atualizado com sucesso.',
            post
        });
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        return res.status(500).json({ error: 'Erro interno ao atualizar post.' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postRepository.remove(id);

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        return res.status(200).json({
            message: 'Post excluído com sucesso.',
            post
        });
    } catch (error) {
        console.error('Erro ao excluir post:', error);
        return res.status(500).json({ error: 'Erro interno ao excluir post.' });
    }
};

const searchPosts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Parâmetro de busca é obrigatório.' });
        }

        const posts = await postRepository.search(q);
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar post por id:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar post.' });
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