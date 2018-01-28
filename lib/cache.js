const redis = require('redis');
const config = require('../config');
const logger = require('./logger');

const client = redis.createClient({
    'host': config.redisHost,
});

client.on('error', console.error);
client.on('ready', () => logger('Connected to Redis.'));

module.exports = client;