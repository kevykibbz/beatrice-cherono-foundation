import { Redis } from "ioredis";

const getRedisUrl = () => {
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  return redisUrl;
};

export const redis = new Redis(getRedisUrl(), {
  lazyConnect: true,
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  connectTimeout: 10000,
});
