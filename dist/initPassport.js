"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
require("dotenv/config");
const passportConfig_1 = require("./passportConfig");
const express_session_1 = __importDefault(require("express-session"));
const initPassport = (app) => {
    //init's the app session
    app.use((0, express_session_1.default)({
        resave: false,
        saveUninitialized: true,
        secret: "dnjhdfklgjdgkjdfl;d;dfgdlf",
    }));
    //init passport
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
exports.initPassport = initPassport;
////////// FACEBOOK //////////
passport_1.default.use(new passport_facebook_1.default.Strategy(passportConfig_1.facebook, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    //done(err, user) will return the user we got from fb
    done(null, formatFB(profile._json));
}));
////////// GOOGLE //////////
passport_1.default.use(new passport_google_oauth20_1.default.Strategy(passportConfig_1.google, async (accessToken, refreshToken, profile, done) => {
    console.log(profile, accessToken, refreshToken);
    //done(err, user) will return the user we got from fb
    done(null, formatGoogle(profile._json, accessToken));
}));
////////// Serialize/Deserialize //////////
// Serialize user into the sessions
passport_1.default.serializeUser((user, done) => done(null, user));
// Deserialize user from the sessions
passport_1.default.deserializeUser((user, done) => done(null, user));
////////// Format data//////////
const formatGoogle = (profile, token) => {
    return {
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        token: token
    };
};
const formatFB = (profile) => {
    return {
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email
    };
};
