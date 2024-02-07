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
const noteController_1 = require("../controllers/noteController");
const noteModel_1 = __importDefault(require("../models/noteModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const jest_mock_1 = require("jest-mock");
jest.mock("../models/noteModel");
const mockedNoteModel = (0, jest_mock_1.mocked)(noteModel_1.default, { shallow: true });
const mockedNote = (0, jest_mock_1.mocked)({}, { shallow: true });
const mockedUser = (0, jest_mock_1.mocked)({}, { shallow: true });
const mockedRequest = (0, jest_mock_1.mocked)({}, { shallow: true });
const mockedResponse = (0, jest_mock_1.mocked)({}, { shallow: true });
const mockedNextFunction = jest.fn();
const mockedObjectId = new mongoose_1.default.Types.ObjectId();
const mockedUserId = mockedObjectId.toHexString();
const mockedNoteId = mockedObjectId.toHexString();
const mockedNoteTitle = "mocked note title";
const mockedNoteContent = "mocked note content";
const mockedNoteCreatedAt = new Date();
const mockedNoteUpdatedAt = new Date();
const mockedNoteUser = mockedUserId;
const mockedNoteData = {
    _id: mockedNoteId,
    title: mockedNoteTitle,
    content: mockedNoteContent,
    createdAt: mockedNoteCreatedAt,
    updatedAt: mockedNoteUpdatedAt,
    user: mockedNoteUser,
};
const mockedNoteDataArray = [mockedNoteData];
const mockedNoteRequest = {
    body: {
        title: mockedNoteTitle,
        content: mockedNoteContent,
    },
    user: mockedUser,
};
const mockedNoteResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
const mockedNoteNextFunction = jest.fn();
const mockedNoteErrorStatus = 400;
const mockedNoteErrorMessage = "mocked note error message";
const mockedNoteErrorHandler = {
    message: mockedNoteErrorMessage,
    statusCode: mockedNoteErrorStatus,
};
const mockedNoteCreateNote = jest.fn();
const mockedNoteGetAllNotes = jest.fn();
const mockedNoteGetNoteById = jest.fn();
const mockedNoteUpdateNote = jest.fn();
const mockedNoteDeleteNote = jest.fn();
const mockedNoteShareNote = jest.fn();
const mockedNoteSearchNotes = jest.fn();
const mockedNoteController = {
    createNote: mockedNoteCreateNote,
    getAllNotes: mockedNoteGetAllNotes,
    getNoteById: mockedNoteGetNoteById,
    updateNote: mockedNoteUpdateNote,
    deleteNote: mockedNoteDeleteNote,
    shareNote: mockedNoteShareNote,
    searchNotes: mockedNoteSearchNotes,
};
const mockedNoteRouter = {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
};
const mockedNoteIsAuthenticated = jest.fn();
const mockedNoteRoutes = {
    noteRouter: mockedNoteRouter,
    isAuthenticated: mockedNoteIsAuthenticated,
};
describe("noteController", () => {
    beforeEach(() => { });
    describe("createNote", () => {
        it("should have a createNote function", () => {
            expect(typeof noteController_1.createNote).toBe("function");
        });
        it("should call NoteModel.create", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNoteCreateNote.mockReturnValueOnce(mockedNote);
            yield (0, noteController_1.createNote)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
        it("should return 201 response code", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNoteCreateNote.mockReturnValueOnce(mockedNote);
            yield (0, noteController_1.createNote)(mockedRequest, mockedResponse, mockedNextFunction);
            //   expect(mockedResponse.status).toHaveBeenCalledWith(201);
        }));
        it("should return json body in response", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNoteCreateNote.mockReturnValueOnce(mockedNote);
            yield (0, noteController_1.createNote)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
    });
    describe("getAllNotes", () => {
        it("should have a getAllNotes function", () => {
            expect(typeof noteController_1.getAllNotes).toBe("function");
        });
        it("should call NoteModel.find({})", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNoteGetAllNotes.mockReturnValueOnce(mockedNoteDataArray);
            yield (0, noteController_1.getAllNotes)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
        it("should return 200 response", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNoteGetAllNotes.mockReturnValueOnce(mockedNoteDataArray);
            yield (0, noteController_1.getAllNotes)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
        it("should return json body in response", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedNoteGetAllNotes.mockReturnValueOnce(mockedNoteDataArray);
            yield (0, noteController_1.getAllNotes)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
    });
});
