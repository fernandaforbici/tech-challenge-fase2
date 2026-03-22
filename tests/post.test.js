const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/database');

describe('Testes de Posts', () => {
    it('Deve criar um novo post', async () => {
        const response = await request(app)
            .post('/posts')
            .send({
                title: 'Teste de Postagem',
                content: 'Conteúdo do post de teste.',
                author: 'Fernanda'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.post).toHaveProperty('id');
    });

    it('Deve listar todos os posts', async () => {
        const response = await request(app).get('/posts');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    afterAll(async () => {
        await pool.end();
    });
});