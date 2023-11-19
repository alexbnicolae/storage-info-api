"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthorization = void 0;
const httpInterceptor_1 = require("./httpInterceptor");
const verifyAuthorization = async (req, res, next) => {
    var _a, _b, _c, _d;
    const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_d = (_c = req.headers["platform"]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === null || _d === void 0 ? void 0 : _d.includes("mobile"))
        isMobile = true;
    let code = await (0, httpInterceptor_1.httpInterceptor)(token, isMobile);
    if (code == 401) {
        return res.json({ data: 401 });
    }
    next();
};
exports.verifyAuthorization = verifyAuthorization;
