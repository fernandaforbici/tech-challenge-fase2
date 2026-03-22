const express = require('express');
const router = express.Router();

const { createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
} = require('../controllers/postController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Minha primeira postagem
 *         content:
 *           type: string
 *           example: Conteúdo completo do post.
 *         author:
 *           type: string
 *           example: Fernanda
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2026-03-21T10:00:00.000Z
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: 2026-03-21T10:30:00.000Z
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: Minha primeira postagem
 *               content:
 *                 type: string
 *                 example: Este é o conteúdo do post
 *               author:
 *                 type: string
 *                 example: Fernanda
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', createPost);
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', getAllPosts);
/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavra-chave
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Palavra-chave para busca no título ou conteúdo
 *     responses:
 *       200:
 *         description: Lista de posts encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: Parâmetro de busca ausente
 */
router.get('/search', searchPosts);
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca um post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 */
router.get('/:id', getPostById);
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.put('/:id', updatePost);
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Exclui um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.delete('/:id', deletePost);

module.exports = router;