const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const postRoutes = require('./routes/postRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send({ message: 'API do Tech Challenge funcionando!' });
});

app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            message: 'Conexão com o banco de dados bem-sucedida!',
            time: result.rows[0].now,
        });
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;