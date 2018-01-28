const _ = require('lodash');
const track = require('../lib/track');
const config = require('../config');

/**
 * Parses a message.
 *
 * @param {Message} msg
 * @return {Promise.<void>}
 */
async function parse(msg) {
    const { 'author': { id }} = msg;

    const guessCount = _.size(msg.content.match(config.trackRegex));

    if (guessCount > 0) {
        const count =  await track.increment(id, guessCount);
        await msg.channel.send(`${msg.author} has now been unsure ${count} times.`);
    }
}

/**
 * Binds tracker to a Discord Client.
 *
 * @param {EventEmitter} client
 */
module.exports = parse;