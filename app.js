const Discord = require('discord.js');
const config = require('./config');
const logger = require('./lib/logger');
const cache = require('./lib/cache');

const commands = require('./middleware/commands');
const tracker = require('./middleware/tracker');

const client = new Discord.Client();
client.on('error', console.error);

client.on('message', async(msg) => {
    if (msg.author.id === client.user.id) {
        return;
    }

    // Bind commands
    if (await commands(msg)) return;

    // Bind tracker
    await tracker(msg);
});

client.on('disconnect', function () {
    clearTimeout(client.ws.connection.ratelimit.resetTimer);
});

client.login(config.botToken).then(() => logger('Connected to Discord.'), logger);

process.on('SIGTERM', async() => {
    logger('Got SIGTERM. Graceful shutdown start.');
    cache.quit();
    await client.destroy();
});