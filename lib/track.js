const cache = require('./cache');
const key = require('./key');

/**
 * Checks if an ID is tracked.
 *
 * @param {string} id The ID to be incremented for.
 * @param {int} inc The increment.
 * @return {Promise.<int>} The amount of times the ID has been unsure.
 */
async function increment(id, inc = 1) {
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
async function getCount(id) {
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
