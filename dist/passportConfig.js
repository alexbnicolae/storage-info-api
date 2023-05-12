"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.github = exports.google = exports.facebook = void 0;
require("dotenv/config");
exports.facebook = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    //todo: based on env, change url to localhost, dev or prod
    callbackURL: "https://ddca-2a02-2f02-504-2000-5538-df46-e493-abbf.ngrok-free.app/user/login/facebook/callback",
};
exports.google = {
    clientID: process.env.GMAIL_APP_ID,
    clientSecret: process.env.GMAIL_APP_SECRET,
    //todo: based on env, change url to localhost, dev or prod
    callbackURL: "https://ddca-2a02-2f02-504-2000-5538-df46-e493-abbf.ngrok-free.app/user/login/google/callback",
};
exports.github = {
    clientID: (_a = process.env.GITHUB_APP_ID) !== null && _a !== void 0 ? _a : '',
    clientSecret: (_b = process.env.GITHUB_APP_SECRET) !== null && _b !== void 0 ? _b : '',
    callbackURL: "https://ddca-2a02-2f02-504-2000-5538-df46-e493-abbf.ngrok-free.app/user/login/github/callback",
    scope: ['user:email']
};
