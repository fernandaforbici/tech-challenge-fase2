const postController = require('../src/controllers/postController');
const postService = require('../src/services/postServices');
jest.mock('../src/services/postServices');

describe('postController', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar um novo post com sucesso e retornar 201', async () => {
        req.body = {
            title: 'Teste de Postagem',
            content: 'Conteúdo do post de teste.',
            author: 'Autor de Teste'
        };
        const serviceResponse = {
            message: 'Post criado com sucesso.',
            post: { id: 1, ...req.body },
        };
        postService.createPost.mockResolvedValue(serviceResponse);
        await postController.createPost(req, res, next);
        expect(postService.createPost).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(serviceResponse);
    });

    it('Deve retornar erro ao criar post com dados inválidos, chamando next', async () => {

        const error = new Error('Erro de Teste');
        postService.getAllPosts.mockRejectedValue(error);
        await postController.getAllPosts(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
    });
});
