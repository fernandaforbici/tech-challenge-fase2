const pool = require('../config/database');

const create = async ({ title, content, author }) => {
    const query = 'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, content, author];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findAll = async () => {
    const query = 'SELECT * FROM posts ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
};

const findById = async (id) => {
    const query = 'SELECT * FROM posts WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
}

const update = async (id, { title, content, author }) => {
    const query = 'UPDATE posts SET title = $1, content = $2, author = $3, updated_at = NOW() WHERE id = $4 RETURNING *';
    const values = [title, content, author, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
};

const remove = async (id) => {
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
};

const search = async (term) => {
    const query = 'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY created_at DESC';
    const values = [`%${term}%`];
    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
    search
};