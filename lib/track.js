const cache = require('./cache');
const key = require('./key');

/**
 * Increments the unsure count of an ID.
 *
 * @param {string} id The ID to be incremented for.
 * @param {int} inc The increment amount.
 * @return {Promise.<int>} The amount of times the ID has been unsure.
 */
function increment(id, inc = 1) {
    return new Promise((resolve, reject) => {
        cache.zincrby(key.TRACKING_COUNT, inc, id, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

/**
 * Get the unsure count of an ID.
 *
 * @param {string} id The ID to be incremented for.
 * @return {Promise.<int>} The amount of times the ID has been unsure.
 */
function getCount(id) {
    return new Promise((resolve, reject) => {
        cache.zscore(key.TRACKING_COUNT, id, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

module.exports = {
    getCount,
    increment,
};
