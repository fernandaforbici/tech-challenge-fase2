const postService = require('../src/services/postServices');
const postRepository = require('../src/repositories/postRepository');

jest.mock('../src/repositories/postRepository');

describe('PostService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('Deve criar um novo post com sucesso', async () => {
        const fakePost = {
            title: 'Teste',
            content: 'Conteúdo de teste',
            author: 'Autor de teste',
            createdAt: new Date(),
            updateAt: new Date(),
        };

        postRepository.create.mockResolvedValue(fakePost);

        const result = await postService.createPost(fakePost);

        expect(postRepository.create).toHaveBeenCalledWith({
            title: fakePost.title,
            content: fakePost.content,
            author: fakePost.author
        });
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

    it('deve retornar todos os posts', async () => {
        const fakePosts = [
            { id: 1, title: 'A', content: 'B', author: 'C' },
            { id: 2, title: 'D', content: 'E', author: 'F' },
        ];

        postRepository.findAll.mockResolvedValue(fakePosts);

        const result = await postService.getAllPosts();

        expect(postRepository.findAll).toHaveBeenCalled();
        expect(result).toEqual(fakePosts);
    });

    it('deve atualizar um post existente', async () => {
        const updatedPost = {
            id: 1,
            title: 'Novo título',
            content: 'Novo conteúdo',
            author: 'Fernanda',
        };

        postRepository.update.mockResolvedValue(updatedPost);

        const result = await postService.updatePost(1, {
            title: 'Novo título',
            content: 'Novo conteúdo',
            author: 'Fernanda',
        });

        expect(postRepository.update).toHaveBeenCalledWith(1, {
            title: 'Novo título',
            content: 'Novo conteúdo',
            author: 'Fernanda',
        });

        expect(result).toEqual({
            message: 'Post atualizado com sucesso.',
            post: updatedPost,
        });
    });

    it('deve lançar erro ao atualizar post inexistente', async () => {
        postRepository.update.mockResolvedValue(null);

        await expect(
            postService.updatePost(999, {
                title: 'Novo título',
                content: 'Novo conteúdo',
                author: 'Fernanda',
            })
        ).rejects.toThrow('Post não encontrado.');
    });

    it('deve excluir um post existente', async () => {
        const deletedPost = {
            id: 1,
            title: 'Teste',
            content: 'Conteúdo',
            author: 'Fernanda',
        };

        postRepository.remove.mockResolvedValue(deletedPost);

        const result = await postService.deletePost(1);

        expect(postRepository.remove).toHaveBeenCalledWith(1);
        expect(result).toEqual({
            message: 'Post excluído com sucesso.',
            post: deletedPost,
        });
    });

    it('deve lançar erro ao excluir post inexistente', async () => {
        postRepository.remove.mockResolvedValue(null);

        await expect(postService.deletePost(999)).rejects.toThrow('Post não encontrado.');
    });

    it('deve buscar posts por termo', async () => {
        const fakePosts = [
            { id: 1, title: 'Prisma', content: 'ORM', author: 'Fernanda' },
        ];

        postRepository.search.mockResolvedValue(fakePosts);

        const result = await postService.searchPosts('Prisma');

        expect(postRepository.search).toHaveBeenCalledWith('Prisma');
        expect(result).toEqual(fakePosts);
    });

    it('deve lançar erro se a busca não receber termo', async () => {
        await expect(postService.searchPosts('')).rejects.toThrow('Parâmetro de busca é obrigatório.');
    });
});