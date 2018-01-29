const moment = require('moment');

/**
 * Logs a message with timestamp.
 *
 * @param {string} msg The message to log.
 */
module.exports = (msg) => {
    const date = new Date();
    console.log(`[${moment().format('HH:mm:ss')}] ${msg}`);
};
