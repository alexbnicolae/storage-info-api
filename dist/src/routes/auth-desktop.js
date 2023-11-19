"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const createToken_1 = require("../utils/createToken");
const user_schema_1 = __importDefault(require("../models/Users/user.schema"));
const visual_mode_enum_1 = require("../utils/enums/visual-mode.enum");
const auth_platform_enum_1 = require("../utils/enums/auth-platform.enum");
const authRouterDesktop = (0, express_1.Router)();
authRouterDesktop.get("/user/login/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] })); //define this scope to have access to the email
authRouterDesktop.get("/desktop/user/login/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/auth/google" }), 
// Redirect user back to the mobile app using deep linking
async (req, res) => {
    var _a;
    let token = (0, createToken_1.createToken)(req.user); // token created
    let user = await user_schema_1.default.findOne({ externId: req.user.id });
    if (!user) {
        await user_schema_1.default.findOneAndUpdate({ externId: req.user.id }, {
            email: req.user.email,
            name: req.user.name,
            externId: (_a = req.user.id) === null || _a === void 0 ? void 0 : _a.toString(),
            token: token,
            validToken: true,
            languageId: 0,
            visualMode: visual_mode_enum_1.VisualModeEnum.Original,
            authPlatform: auth_platform_enum_1.AuthPlatformEnum.Google
        }, { upsert: true });
    }
    else {
        await user_schema_1.default.findOneAndUpdate({ externId: req.user.id }, {
            token: token
        });
    }
    res.json(`storageinfodesktop://app/login?token=${token}/isUserNew=${!user}`);
});
exports.default = authRouterDesktop;
