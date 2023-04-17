"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserService = exports.getUserService = void 0;
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const getUserService = async (token) => {
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        return user;
    }
    catch (error) {
        return 400;
    }
};
exports.getUserService = getUserService;
const editUserService = async (data, token) => {
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (!!user)
            await user_schema_1.default.findOneAndUpdate({ token: token }, data);
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.editUserService = editUserService;
