"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jwt = require('jsonwebtoken');
const createToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_SESSION_KEY, { expiresIn: '24h' });
    return token;
};
exports.createToken = createToken;
