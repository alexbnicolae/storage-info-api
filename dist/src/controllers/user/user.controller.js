"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserController = exports.getUserController = void 0;
const user_service_1 = require("../../services/user/user.service");
const getToken_1 = require("../../utils/getToken");
const getUserController = async (req, res) => {
    var _a, _b;
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_b = (_a = req.headers["platform"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, user_service_1.getUserService)(token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.getUserController = getUserController;
const editUserController = async (req, res) => {
    var _a, _b;
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_b = (_a = req.headers["platform"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, user_service_1.editUserService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.editUserController = editUserController;
