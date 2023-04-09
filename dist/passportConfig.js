"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitter = exports.google = exports.facebook = void 0;
require("dotenv/config");
exports.facebook = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    //todo: based on env, change url to localhost, dev or prod
    callbackURL: "https://precor.serveo.net/user/login/facebook/callback",
    enableProof: true,
    profileFields: ['id', 'emails', 'displayName'], //scope of fields,
};
exports.google = {
    clientID: process.env.GMAIL_APP_ID,
    clientSecret: process.env.GMAIL_APP_SECRET,
    //todo: based on env, change url to localhost, dev or prod
    callbackURL: "https://precor.serveo.net/user/login/google/callback",
};
exports.twitter = {
    consumerKey: (_a = process.env.TWITTER_APP_ID) !== null && _a !== void 0 ? _a : '',
    consumerSecret: (_b = process.env.TWITTER_APP_SECRET) !== null && _b !== void 0 ? _b : '',
    callbackURL: "https://precor.serveo.net/user/login/twitter/callback",
};
