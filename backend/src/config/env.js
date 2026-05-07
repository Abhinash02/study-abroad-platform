const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: Number(process.env.PORT) || 4000,
  mongoUri:
    process.env.MONGODB_URI || "mongodb+srv://abhinash:abhinash@cluster0.fffyhvp.mongodb.net/",
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS) || 300,
  redisUrl: process.env.REDIS_URL || "",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};