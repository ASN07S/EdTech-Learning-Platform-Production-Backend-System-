import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

// Create client
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

// Events
redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (e) => console.error('❌ Redis error:', e));

// ---------- CACHE ----------
export const cache = {
  async set(key, value, ttl = 3600) {
    return redis.set(key, JSON.stringify(value), 'EX', ttl);
  },
  async get(key) {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },
  async del(key) {
    return redis.del(key);
  }
};

// ---------- RATE LIMIT ----------
export const rateLimiter = async (key, window = 60) => {
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, window);
  return { count, ttl: await redis.ttl(key) };
};

// ---------- PUB/SUB ----------
const sub = new Redis();

export const pubsub = {
  publish: (channel, msg) =>
    redis.publish(channel, JSON.stringify(msg)),

  subscribe: (channel, handler) => {
    sub.subscribe(channel);
    sub.on('message', (ch, msg) => {
      if (ch === channel) handler(JSON.parse(msg));
    });
  }
};

export default redis;