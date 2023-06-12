"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const createToken_1 = require("../utils/createToken");
const user_schema_1 = __importDefault(require("../models/Users/user.schema"));
const httpInterceptor_1 = require("../utils/httpInterceptor");
const visual_mode_enum_1 = require("../utils/enums/visual-mode.enum");
const auth_platform_enum_1 = require("../utils/enums/auth-platform.enum");
const authRouter = (0, express_1.Router)();
// will go access 3rd party to get permission to access the data
authRouter.get("/user/login/facebook", passport_1.default.authenticate("facebook", { scope: ["profile", "email"] }), async (req, res) => { console.log(req.body); }); //define the scope to also access the email
authRouter.get("/user/login/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] })); //define this scope to have access to the email
authRouter.get("/user/login/github", passport_1.default.authenticate("github", { scope: ['user:email'] })); //define this scope to have access to the email
//once permission to exchange data is granted, a callback will be fired
authRouter.get("/user/login/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/auth/facebook" }), 
// Redirect user back to the mobile app using deep linking
async (req, res) => {
    let token = (0, createToken_1.createToken)(req.user); // token created
    // await User.findByIdAndUpdate(req.user.id, {
    //     email: req.user.email,
    //     name: req.user.name,
    //     externId: req.user.id?.toString(),
    //     token: token,
    //     validToken: true
    // }, { upsert: true })
    res.redirect(`storageInfoApp://app/login?token=${token}`);
});
authRouter.get("/user/login/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/auth/google" }), 
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
    res.redirect(`storageInfoApp://app/login?token=${token}/isUserNew=${!user}`);
});
authRouter.get('/user/login/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
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
            authPlatform: auth_platform_enum_1.AuthPlatformEnum.Github
        }, { upsert: true });
    }
    else {
        await user_schema_1.default.findOneAndUpdate({ externId: req.user.id }, {
            token: token
        });
    }
    res.redirect(`storageInfoApp://app/login?token=${token}/isUserNew=${!user}`);
});
authRouter.get("/logout", async function (req, res) {
    var _a, _b;
    const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    let code = await (0, httpInterceptor_1.httpInterceptor)(token);
    if (code == 401) {
        res.json({ code: 401 });
    }
    else {
        await user_schema_1.default.findOneAndUpdate({ token: token }, {
            validToken: false
        });
        res.json({ code: 200 });
    }
});
exports.default = authRouter;
