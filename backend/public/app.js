"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_slow_down_1 = __importDefault(require("express-slow-down"));
const error_1 = require("./middleware/error");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
require("dotenv").config();
exports.app.use(express_1.default.json({ limit: "50mb" }));
// app.use(express.urlencoded({limit: "50mb", extended: true }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: "https://test-signin-signup.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// Rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
// Speed limiting middleware
const speedLimiter = (0, express_slow_down_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests per 15 minutes, then...
    delayMs: () => 500, // begin adding 500ms of delay per request above 100
    maxDelayMs: 2000,
});
exports.app.use(limiter);
exports.app.use(speedLimiter);
//routes
exports.app.use("/api/v1", userRoutes_1.default);
exports.app.use("/api/v1", noteRoutes_1.default);
//api
exports.app.get("/", (req, res, next) => {
    res.send("Hello World!! It is api port!!!");
});
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({ success: true, message: "API is Working!" });
});
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    next(err);
});
exports.app.use(error_1.ErrorMiddleware);
