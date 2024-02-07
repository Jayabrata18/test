"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
require("dotenv").config();
const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log("Redis Connected");
        return new ioredis_1.Redis(process.env.REDIS_URL);
    }
    throw new Error("Redis not connected");
};
exports.redis = redisClient();
