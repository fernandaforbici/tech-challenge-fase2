const pool = require('../config/database');

const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }


        const query = 'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *';
        const values = [title, content, author];

        const result = await pool.query(query, values);

        return res.status(201).json({ message: 'Post criado com sucesso.', post: result.rows[0] });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        return res.status(500).json({ error: 'Erro interno ao criar post.' });

    }

}
const getAllPosts = async (req, res) => {
    try {
        const query = 'SELECT * FROM posts ORDER BY created_at DESC';
        const result = await pool.query(query);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return res.status(500).json({ error: 'Erro interno ao buscar posts.' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM posts WHERE id = $1';
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        return res.status(200).json(result.rows[0]);
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

        const query = 'UPDATE posts SET title = $1, content = $2, author = $3, updated_at = NOW() WHERE id = $4 RETURNING *';
        const values = [title, content, author, id];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        return res.status(200).json({
            message: 'Post atualizado com sucesso.',
            post: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        return res.status(500).json({ error: 'Erro interno ao atualizar post.' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        return res.status(200).json({
            message: 'Post excluído com sucesso.',
            post: result.rows[0]
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
        const query = 'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY created_at DESC';
        const values = [`%${q}%`];
        const result = await pool.query(query, values);
        return res.status(200).json(result.rows);

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