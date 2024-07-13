require("dotenv").config();

const config = {
  REDIS_HOST:
    process.env.REDIS_HOST ||
    "redis-19391.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
  REDIS_PASS: process.env.REDIS_PASS || "WcajjdyWsLce4Mmi4YzwA8YNbsonhjzh",
  REDIS_PORT: process.env.REDIS_PORT || 19391,
  THROTTLING_WINDOW_MS: 60000 * 10, //10 MIN
  THROTTLING_LIMIT_EACH_IP: 20,
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5003,
  JWT_SECRET: process.env.JWT_SECRET || "tkf2efDPQEqKKmq",
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://admin:vsuyGLadTUkMA3oP@cluster0.u3psp.mongodb.net/wsl_task?authMechanism=DEFAULT",
};

module.exports = config;
