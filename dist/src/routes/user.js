"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user/user.controller");
const userRouter = (0, express_1.Router)();
// get file
userRouter.get('/getUser', user_controller_1.getUserController);
// update user
userRouter.put('/editUser', user_controller_1.editUserController);
exports.default = userRouter;
