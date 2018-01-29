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

/**
 * Handler for the shutdown command.
 *
 * @param {Message} msg The message.
 * @return {Promise.<void>}
 */
async function commandShutdown(msg) {
    cache.quit();
    await msg.reply('👋');
    await msg.client.destroy();
}

/**
 * Map of all commands. Maps the base command trigger to a handler.
 */
const commands = {
    'stats': commandStats,
    'shutdown': commandShutdown,
};

/**
 * Parses a message and check whether it's a command or not.
 *
 * @param {Message} msg The message to parse.
 * @return {Promise.<boolean>} If a command was caught.
 */
module.exports = async(msg) => {
    const { content } = msg;
    // Ignore non-owners and messages not starting with the prefix.
    if (msg.author.id !== config.owner || !_.startsWith(content, config.commandPrefix)) {
        return false;
    }

    // todo: use _.words
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
};

