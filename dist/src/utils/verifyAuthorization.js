"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorization = void 0;
const httpInterceptor_1 = require("./httpInterceptor");
const verifyAuthorization = async (req) => {
    var _a, _b;
    const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    let code = await (0, httpInterceptor_1.httpInterceptor)(token);
    if (code == 401) {
        let res = { code: 401, token: null };
        return res;
    }
    else {
        let res = { code: 200, token: token };
        return res;
    }
};
exports.verifyAuthorization = verifyAuthorization;
