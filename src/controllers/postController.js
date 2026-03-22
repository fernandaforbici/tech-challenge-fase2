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


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
};