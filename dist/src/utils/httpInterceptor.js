"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpInterceptor = void 0;
const user_schema_1 = __importDefault(require("../models/Users/user.schema"));
const httpInterceptor = async (token, isMobile) => {
    let user;
    if (isMobile) {
        user = await user_schema_1.default.findOne({ token: token });
    }
    else {
        user = await user_schema_1.default.findOne({ tokenNonMobile: token });
    }
    if (!!user)
        return 200;
    else
        return 401;
};
exports.httpInterceptor = httpInterceptor;
