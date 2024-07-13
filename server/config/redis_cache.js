const redis = require("redis");
const config = require("./config");

const redis_cache = redis.createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
  password: config.REDIS_PASS,
});

redis_cache.on("error", (err) => console.log("Redis Client Error", err));
redis_cache.on("connect", () => console.log("Connected to Redis"));

redis_cache.connect();

module.exports = redis_cache;
