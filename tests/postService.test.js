const postService = require('../src/services/postServices');
const postRepository = require('../src/repositories/postRepository');
const { post } = require('../src/routes');

jest.mock('../src/repositories/postRepository');

describe('PostService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('Deve criar um novo post com sucesso', async () => {
        const fakePost = {
            title: 'Teste',
            content: 'Conteúdo de teste',
            author: 'Autor de teste'
        };

        postRepository.create.mockResolvedValue(fakePost);

        const result = await postService.createPost(fakePost);

        expect(postRepository.create).toHaveBeenCalledWith(fakePost);
        expect(result).toEqual({
            message: 'Post criado com sucesso.',
            post: fakePost
        });

    });

    it('Deve lançar erro ao criar post com dados inválidos', async () => {
        await expect(
            postService.createPost({
                title: 'Teste',
                content: '',
                author: 'Professor'
            })
        ).rejects.toThrow('Todos os campos são obrigatórios');
    });
    it('deve retornar um post por ID', async () => {
        const fakePost = {
            id: 1,
            title: 'Teste',
            content: 'Conteúdo de teste',
            author: 'Professor'
        };
        postRepository.findById.mockResolvedValue(fakePost);

        const result = await postService.getPostById(1);

        expect(postRepository.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual(fakePost);
    });
    it('deve lançar erro ao buscar post por ID inexistente', async () => {
        postRepository.findById.mockResolvedValue(null);

        await expect(postService.getPostById(999)).rejects.toThrow('Post não encontrado.');
    });
});