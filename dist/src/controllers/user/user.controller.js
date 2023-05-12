"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserController = exports.getUserController = void 0;
const user_service_1 = require("../../services/user/user.service");
const getToken_1 = require("../../utils/getToken");
const getUserController = async (req, res) => {
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let resProcessingData = await (0, user_service_1.getUserService)(token);
    return res.json({ data: resProcessingData });
};
exports.getUserController = getUserController;
const editUserController = async (req, res) => {
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let resProcessingData = await (0, user_service_1.editUserService)(req.body, token);
    return res.json({ data: resProcessingData });
};
exports.editUserController = editUserController;
