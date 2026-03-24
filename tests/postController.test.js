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

    it('deve listar posts e retornar 200', async () => {
        const fakePosts = [{ id: 1, title: 'Teste', content: 'Conteúdo', author: 'Fernanda' }];
        postService.getAllPosts.mockResolvedValue(fakePosts);

        await postController.getAllPosts(req, res, next);

        expect(postService.getAllPosts).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakePosts);
    });

    it('deve buscar post por id e retornar 200', async () => {
        req.params.id = 1;

        const fakePost = { id: 1, title: 'Teste', content: 'Conteúdo', author: 'Fernanda' };
        postService.getPostById.mockResolvedValue(fakePost);

        await postController.getPostById(req, res, next);

        expect(postService.getPostById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakePost);
    });

    it('deve atualizar post e retornar 200', async () => {
        req.params.id = 1;
        req.body = {
            title: 'Novo título',
            content: 'Novo conteúdo',
            author: 'Fernanda',
        };

        const serviceResponse = {
            message: 'Post atualizado com sucesso.',
            post: { id: 1, ...req.body },
        };

        postService.updatePost.mockResolvedValue(serviceResponse);

        await postController.updatePost(req, res, next);

        expect(postService.updatePost).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(serviceResponse);
    });

    it('deve excluir post e retornar 200', async () => {
        req.params.id = 1;

        const serviceResponse = {
            message: 'Post excluído com sucesso.',
            post: { id: 1, title: 'Teste', content: 'Conteúdo', author: 'Fernanda' },
        };

        postService.deletePost.mockResolvedValue(serviceResponse);

        await postController.deletePost(req, res, next);

        expect(postService.deletePost).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(serviceResponse);
    });

    it('deve buscar posts por termo e retornar 200', async () => {
        req.query.q = 'Prisma';

        const fakePosts = [{ id: 1, title: 'Prisma', content: 'ORM', author: 'Fernanda' }];
        postService.searchPosts.mockResolvedValue(fakePosts);

        await postController.searchPosts(req, res, next);

        expect(postService.searchPosts).toHaveBeenCalledWith('Prisma');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakePosts);
    });

    it('deve chamar next em caso de erro', async () => {
        const error = new Error('Erro de teste');
        postService.getAllPosts.mockRejectedValue(error);

        await postController.getAllPosts(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
