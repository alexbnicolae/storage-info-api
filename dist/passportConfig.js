"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = exports.facebook = void 0;
require("dotenv/config");
exports.facebook = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    //todo: based on env, change url to localhost, dev or prod
    callbackURL: "https://precor.serveo.net/user/login/google/callback",
    enableProof: true,
    profileFields: ['id', 'emails', 'name'] //scope of fields
};
exports.google = {
    clientID: process.env.GMAIL_APP_ID,
    clientSecret: process.env.GMAIL_APP_SECRET,
    //todo: based on env, change url to localhost, dev or prod
    callbackURL: "https://precor.serveo.net/user/login/google/callback"
};
