//const pool = require('../config/database');
const prisma = require('../lib/prismaClient');

const create = async ({ title, content, author }) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            author
        }
    });
};

const findAll = async () => {
    return await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};

const findById = async (id) => {
    return await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    });
};

const update = async (id, { title, content, author }) => {
    const existingPost = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!existingPost) {
        return null;
    }

    return await prisma.post.update({
        where: {
            id: Number(id),
        },
        data: {
            title: title || existingPost.title,
            content: content || existingPost.content,
            author: author || existingPost.author
        }
    });

};

const remove = async (id) => {
    const existingPost = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!existingPost) {
        return null;
    }
    return await prisma.post.delete({
        where: {
            id: Number(id)
        }
    });
};

const search = async (term) => {
    return await prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: term,
                        mode: 'insensitive'
                    }
                },
                {
                    content: {
                        contains: term,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
    search
};