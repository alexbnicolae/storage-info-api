"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user/user.controller");
const verifyAuthorization_1 = require("../utils/verifyAuthorization");
const userRouter = (0, express_1.Router)();
// get file
userRouter.get('/getUser', verifyAuthorization_1.verifyAuthorization, user_controller_1.getUserController);
// update user
userRouter.put('/editUser', verifyAuthorization_1.verifyAuthorization, user_controller_1.editUserController);
exports.default = userRouter;
