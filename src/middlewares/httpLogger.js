const pinoHttp = require('pino-http');
const logger = require('../config/logger');

const httpLogger = pinoHttp({
    logger,
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500 || err) {
            return 'error';
        }
        if (res.statusCode >= 400) {
            return 'warn';
        }
        return 'info';
    },
    customSuccessMessage: (req, res) => {
        return `${req.method} ${req.url} concluída com sucesso ${res.statusCode}`;
    },
    customErrorMessage: (req, res, err) => {
        return `${req.method} ${req.url} falhou com status ${res.statusCode}: ${err.message}`;
    },
    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
                headers: req.headers,
                params: req.params,
                query: req.query,
                body: req.body
            };
        }
    }

});

module.exports = httpLogger;