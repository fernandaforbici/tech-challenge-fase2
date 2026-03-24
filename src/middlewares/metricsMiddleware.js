const {
    httpRequestCounter,
    httpRequestDuration
} = require('../config/metrics');

const metricsMiddleware = (req, res, next) => {
    const start = process.hrtime();
    res.on('finish', () => {
        const diff = process.hrtime(start);
        const durationInSeconds = diff[0] + diff[1] / 1e9;

        const route = req.route?.path || req.baseUrl || req.path|| 'unknown';
        httpRequestCounter.inc({
            method: req.method,
            route,
            status_code: res.statusCode
        });
        httpRequestDuration.observe({
            method: req.method,
            route,
            status_code: res.statusCode
        }, durationInSeconds);
    });
    next();
};

module.exports = metricsMiddleware;