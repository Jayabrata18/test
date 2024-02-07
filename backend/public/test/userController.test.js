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
const userController_1 = require("../controllers/userController");
const userModel_1 = __importDefault(require("../models/userModel"));
const jest_mock_1 = require("jest-mock");
// import { mockedObjectId } from "./noteController.test";
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock("../models/userModel");
const mockedUserModel = (0, jest_mock_1.mocked)(userModel_1.default, { shallow: true });
const mockedUser = (0, jest_mock_1.mocked)({}, { shallow: true });
const mockedRequest = (0, jest_mock_1.mocked)({}, { shallow: true });
const mockedResponse = (0, jest_mock_1.mocked)({}, { shallow: true });
const mockedNextFunction = jest.fn();
const mockedObjectId = new mongoose_1.default.Types.ObjectId();
const mockedUserId = mockedObjectId.toHexString();
const mockedUserEmail = "test@test.com";
const mockedUserRequest = {
    body: {
        email: mockedUserEmail,
    },
    user: mockedUser,
};
const mockedUserResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
const mockedUserNextFunction = jest.fn();
const mockedUserErrorStatus = 400;
const mockedUserErrorMessage = "mocked user error message";
const mockedUserErrorHandler = {
    message: mockedUserErrorMessage,
    statusCode: mockedUserErrorStatus,
};
const mockedUserRegistrationUser = jest.fn();
const mockedUserLoginUser = jest.fn();
const mockedUserLogoutUser = jest.fn();
const mockedUserUpdateAccessToken = jest.fn();
const mockedUserUpdateRefreshToken = jest.fn();
const mockedUserGenerateAccessToken = jest.fn();
const mockedUserGenerateRefreshToken = jest.fn();
const mockedUserSendToken = jest.fn();
const mockedUserRedisSet = jest.fn();
const mockedUserRedisGet = jest.fn();
const mockedUserRedisDel = jest.fn();
const mockedUserRedisExpire = jest.fn();
const mockedUserJwtSign = jest.fn();
const mockedUserJwtVerify = jest.fn();
const mockedUserJwtDecode = jest.fn();
const mockedUserJwtPayload = {
    userId: mockedUserId,
    email: mockedUserEmail,
};
const mockedUserJwtOptions = {
    expiresIn: "1d",
};
describe("userController", () => {
    beforeEach(() => {
    });
    describe("registrationUser", () => {
        it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedUserRegistrationUser.mockResolvedValueOnce(mockedUser);
            mockedUserSendToken.mockResolvedValueOnce(mockedUser);
            mockedUserRedisSet.mockResolvedValueOnce(mockedUser);
            mockedUserRedisExpire.mockResolvedValueOnce(mockedUser);
            mockedUserJwtSign.mockResolvedValueOnce(mockedUser);
            mockedUserJwtVerify.mockResolvedValueOnce(mockedUser);
            mockedUserJwtDecode.mockResolvedValueOnce(mockedUserJwtPayload);
            yield (0, userController_1.registrationUser)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
    });
    describe("loginUser", () => {
        it("should login a user", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedUserModel.findOne.mockResolvedValueOnce(mockedUser);
            mockedUserLoginUser.mockResolvedValueOnce(mockedUser);
            mockedUserSendToken.mockResolvedValueOnce(mockedUser);
            mockedUserRedisSet.mockResolvedValueOnce(mockedUser);
            mockedUserRedisExpire.mockResolvedValueOnce(mockedUser);
            mockedUserJwtSign.mockResolvedValueOnce(mockedUser);
            mockedUserJwtVerify.mockResolvedValueOnce(mockedUser);
            mockedUserJwtDecode.mockResolvedValueOnce(mockedUserJwtPayload);
            yield (0, userController_1.loginUser)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
    });
    describe("logoutUser", () => {
        it("should logout a user", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedUserLogoutUser.mockResolvedValueOnce(mockedUser);
            mockedUserRedisDel.mockResolvedValueOnce(mockedUser);
            yield (0, userController_1.logoutUser)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
    });
    describe("updateAccessToken", () => {
        it("should update access token", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedUserUpdateAccessToken.mockResolvedValueOnce(mockedUser);
            mockedUserRedisGet.mockResolvedValueOnce(mockedUser);
            mockedUserRedisDel.mockResolvedValueOnce(mockedUser);
            mockedUserJwtVerify.mockResolvedValueOnce(mockedUser);
            mockedUserJwtDecode.mockResolvedValueOnce(mockedUserJwtPayload);
            mockedUserJwtSign.mockResolvedValueOnce(mockedUser);
            mockedUserRedisSet.mockResolvedValueOnce(mockedUser);
            mockedUserRedisExpire.mockResolvedValueOnce(mockedUser);
            yield (0, userController_1.updateAccessToken)(mockedRequest, mockedResponse, mockedNextFunction);
        }));
    });
});
