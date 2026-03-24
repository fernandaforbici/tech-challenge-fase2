const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor.';

    if (req.log){
        req.log.error({ 
            err: {
                message: err.message,
                stack: err.stack,
                statusCode: statusCode
            },
        }, `Erro tratado pelo middleware global: ${message}`);
    } else if (process.env.NODE_ENV === 'test') {
        console.error(err);
    }

    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;