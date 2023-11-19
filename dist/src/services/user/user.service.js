"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserService = exports.getUserService = void 0;
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const getUserService = async (token, isMobile) => {
    try {
        let user;
        if (isMobile)
            user = await user_schema_1.default.findOne({ token: token });
        else
            user = await user_schema_1.default.findOne({ tokenNonMobile: token });
        if (user === null)
            return 400;
        return user;
    }
    catch (error) {
        return 400;
    }
};
exports.getUserService = getUserService;
const editUserService = async (data, token, isMobile) => {
    try {
        let user;
        if (isMobile)
            user = await user_schema_1.default.findOne({ token: token });
        else
            user = await user_schema_1.default.findOne({ tokenNonMobile: token });
        if (user === null)
            return 400;
        if (!!user) {
            if (isMobile)
                await user_schema_1.default.findOneAndUpdate({ token: token }, data);
            else
                await user_schema_1.default.findOneAndUpdate({ tokenNonMobile: token }, data);
        }
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.editUserService = editUserService;
