const moment = require('moment');

module.exports = (msg) => {
    const date = new Date();
    console.log(`[${moment().format('HH:mm:ss')}] ${msg}`);
};
