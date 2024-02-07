"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
userRouter.post("/registration", userController_1.registrationUser);
userRouter.post("/login", userController_1.loginUser);
userRouter.get("/logout", auth_1.isAuthenticated, userController_1.logoutUser);
userRouter.get("/refresh", userController_1.updateAccessToken);
exports.default = userRouter;
