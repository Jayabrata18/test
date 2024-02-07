"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const auth_1 = require("../middleware/auth");
const noteRouter = express_1.default.Router();
noteRouter.post("/create-note", auth_1.isAuthenticated, noteController_1.createNote);
noteRouter.get("/notes", auth_1.isAuthenticated, noteController_1.getAllNotes);
noteRouter.get("/notes/:id", auth_1.isAuthenticated, noteController_1.getNoteById);
noteRouter.put("/notes/:id", auth_1.isAuthenticated, noteController_1.updateNote);
noteRouter.delete("/notes/:id", auth_1.isAuthenticated, noteController_1.deleteNote);
noteRouter.post("/notes/:id/share", auth_1.isAuthenticated, noteController_1.shareNote);
noteRouter.get("/search", auth_1.isAuthenticated, noteController_1.searchNotes);
exports.default = noteRouter;
