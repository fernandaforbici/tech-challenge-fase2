const client = require('prom-client');

const register = new client.Registry();

client.collectDefaultMetrics({
    register,
});

const httpRequestCounter = new client.Counter({
    name: 'http_request_total',
    help: 'Total de requisições HTTP',
    labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duração das requisições HTTP em segundos',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2.5, 5, 10]
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);

module.exports = {
    client,
    register,
    httpRequestCounter,
    httpRequestDuration
};