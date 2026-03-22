const swaggerJSDoc = require('swagger-jsdoc');
const { serve } = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tech Challenge - API Blog',
            version: '1.0.0',
            description: 'API para gerenciamento de postagens de blog educacional.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;