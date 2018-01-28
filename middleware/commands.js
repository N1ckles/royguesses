const _ = require('lodash');
const track = require('../lib/track');
const config = require('../config');
const cache = require('../lib/cache');
const logger = require('../lib/logger');

/**
 * Handler for the stats command.
 *
 * @param {Message} msg The message.
 * @return {Promise.<void>}
 */
async function commandStats(msg) {
    const user = msg.mentions.users.first();

    if (!_.isNil(user)) {
        await msg.reply(`${user.username} has been unsure ${await track.getCount(user.id)} times.`);
    } else {
        await msg.reply('please specify a user.');
    }
}

async function commandShutdown(msg) {
    cache.quit();
    await msg.reply('👋');
    await msg.client.destroy();
}

const commands = {
    'stats': commandStats,
    'shutdown': commandShutdown,
};

/**
 * Parses a message.
 *
 * @param {Message} msg
 * @return {Promise.<boolean>} If a command was caught.
 */
async function parse(msg) {
    const { content } = msg;
    if (msg.author.id !== config.owner || !_.startsWith(content, config.commandPrefix)) {
        return false;
    }

    const command = _.chain(content)
        .split(' ')
        .head()
        .slice(_.size(config.commandPrefix))
        .join('')
        .toLower()
        .value();

    if (_.has(commands, command)) {
        logger(`${msg.author.username} ran '${command}'`);
        await commands[command](msg);
    } else {
        await msg.reply("I don't know that command.");
    }

    return true;
}

/**
 * Binds commands to a Discord Client.
 *
 * @param {EventEmitter} client
 */
module.exports = parse;
