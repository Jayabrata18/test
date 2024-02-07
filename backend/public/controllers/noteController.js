"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.shareNote = exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getAllNotes = exports.createNote = void 0;
const noteModel_1 = __importDefault(require("../models/noteModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsynceErroe_1 = __importDefault(require("../middleware/catchAsynceErroe"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.createNote = (0, catchAsynceErroe_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || "";
        const { title, content } = req.body;
        const currentTime = new Date();
        const note = yield noteModel_1.default.create({
            title,
            content,
            user: userId,
            createdAt: currentTime,
        });
        res.status(201).json({ success: true, data: note });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.getAllNotes = (0, catchAsynceErroe_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id) || "";
        const notes = yield noteModel_1.default.find({ user: userId });
        res.status(200).json({ success: true, data: notes });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.getNoteById = (0, catchAsynceErroe_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = ((_c = req.user) === null || _c === void 0 ? void 0 : _c._id) || "";
        const noteId = req.params.id;
        const note = yield noteModel_1.default.findOne({ _id: noteId, user: userId });
        if (!note) {
            return res
                .status(404)
                .json({ success: false, message: "Note not found" });
        }
        res.status(200).json({ success: true, data: note });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.updateNote = (0, catchAsynceErroe_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const userId = ((_d = req.user) === null || _d === void 0 ? void 0 : _d._id) || "";
        const noteId = req.params.id;
        const { title, content } = req.body;
        const note = yield noteModel_1.default.findOneAndUpdate({ _id: noteId, user: userId }, { title, content }, { new: true });
        if (!note) {
            return res
                .status(404)
                .json({ success: false, message: "Note not found" });
        }
        res.status(200).json({ success: true, data: note });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.deleteNote = (0, catchAsynceErroe_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = ((_e = req.user) === null || _e === void 0 ? void 0 : _e._id) || "";
        const noteId = req.params.id;
        const note = yield noteModel_1.default.findOneAndDelete({
            _id: noteId,
            user: userId,
        });
        if (!note) {
            return res
                .status(404)
                .json({ success: false, message: "Note not found" });
        }
        res.status(200).json({ success: true, data: note });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.shareNote = (0, catchAsynceErroe_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userId = ((_f = req.user) === null || _f === void 0 ? void 0 : _f._id) || "";
        const noteId = req.params.id;
        const { sharedUserId } = req.body;
        const note = yield noteModel_1.default.findOne({ _id: noteId, user: userId });
        if (!note) {
            return res
                .status(404)
                .json({ success: false, message: "Note not found" });
        }
        const userToShareWith = yield userModel_1.default.findById(sharedUserId);
        if (!userToShareWith) {
            return res
                .status(404)
                .json({ success: false, message: "User to share with not found" });
        }
        const sharedUserIdObj = new mongoose_1.default.Types.ObjectId(sharedUserId);
        if (note.sharedWith.includes(sharedUserIdObj)) {
            return res.status(400).json({
                success: false,
                message: "Note already shared with this user",
            });
        }
        note.sharedWith.push(sharedUserIdObj);
        yield note.save();
        res.status(200).json({
            success: true,
            data: note,
            message: "Note shared successfully",
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.searchNotes = (0, catchAsynceErroe_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const userId = ((_g = req.user) === null || _g === void 0 ? void 0 : _g._id) || "";
        const { q } = req.query;
        const notes = yield noteModel_1.default.find({
            user: userId,
            $or: [
                { title: { $regex: q, $options: "i" } },
                { content: { $regex: q, $options: "i" } },
            ],
        });
        res.status(200).json({ success: true, data: notes });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
