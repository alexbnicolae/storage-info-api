"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_twitter_1 = __importDefault(require("passport-twitter"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
require("dotenv/config");
const passportConfig_1 = require("./passportConfig");
const express_session_1 = __importDefault(require("express-session"));
const initPassport = (app) => {
    var _a;
    //init's the app session
    app.use((0, express_session_1.default)({
        resave: false,
        saveUninitialized: true,
        secret: (_a = process.env.SECRET_SESSION_KEY) !== null && _a !== void 0 ? _a : '',
    }));
    //init passport
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
exports.initPassport = initPassport;
////////// FACEBOOK //////////
passport_1.default.use(new passport_facebook_1.default.Strategy(passportConfig_1.facebook, async (accessToken, refreshToken, profile, done) => {
    //done(err, user) will return the user we got from fb
    done(null, formatFB(profile));
}));
////////// GOOGLE //////////
passport_1.default.use(new passport_google_oauth20_1.default.Strategy(passportConfig_1.google, async (accessToken, refreshToken, profile, done) => {
    //done(err, user) will return the user we got from fb
    done(null, formatGoogle(profile._json));
}));
passport_1.default.use(new passport_twitter_1.default.Strategy(passportConfig_1.twitter, async (accessToken, refreshToken, profile, done) => {
    //done(err, user) will return the user we got from fb
    done(null, formatTwitter(profile._json));
}));
////////// TWITTER //////////
////////// Serialize/Deserialize //////////
// Serialize user into the sessions
passport_1.default.serializeUser((user, done) => done(null, user));
// Deserialize user from the sessions
passport_1.default.deserializeUser((user, done) => done(null, user));
////////// Format data//////////
const formatGoogle = (profile) => {
    return {
        id: profile.sub,
        name: profile.name,
        email: profile.email
    };
};
const formatFB = (profile) => {
    console.log(profile);
    return {
        id: profile.id,
        name: profile.name,
        // email: profile.email
    };
};
const formatTwitter = (profile) => {
    console.log(profile);
    return {
        id: profile.id,
        name: profile.name,
        // email: profile.email
    };
};
