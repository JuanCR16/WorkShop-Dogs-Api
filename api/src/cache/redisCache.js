const redis = require('async-redis');
const client = redis.createClient({

    host: 'redis-server',

    port: 6379,

});

const expirationTime = 300; //second
const keyFormat = 'identifier=';

async function setCache(id, data) {
    var key = keyFormat + id;
    return await set(key, JSON.stringify(data))
}

async function set(key, data) {
    await client.setex(key, expirationTime, data);
}

async function getCache(id) {
    var key = keyFormat + id;
    var data = await get(key);
    return JSON.parse(data);
}

async function get(key) {
    return await client.get(key);
}

async function clearCache(id) {
    var key = keyFormat + id;
    return await clear(key);
}

async function clear(key) {
    return await client.del(key);
}

module.exports.getCache = getCache
module.exports.setCache = setCache
module.exports.clearCache = clearCache