const _ = require("lodash");

module.exports = {
    'botToken': _.get(process.env, 'BOT_TOKEN', ''),
    'commandPrefix': _.get(process.env, 'COMMAND_PREFIX', '!'),
    'owner': process.env.OWNER_ID,
    'trackRegex': /i guess/ig,
    'redisHost': _.get(process.env, 'REDIS_HOST', 'redis'),
};
