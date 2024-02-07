"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    //wrong mongodb  id
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler_1.default(400, message);
    }
    //duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler_1.default(400, message);
    }
    //wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid. Try Again!!!`;
        err = new ErrorHandler_1.default(400, message);
    }
    //jwt expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired. Try Again!!!`;
        err = new ErrorHandler_1.default(400, message);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
