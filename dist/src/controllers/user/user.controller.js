"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserController = exports.getUserController = void 0;
const verifyAuthorization_1 = require("../../utils/verifyAuthorization");
const user_service_1 = require("../../services/user/user.service");
const getUserController = async (req, res) => {
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    let resProcessingData = await (0, user_service_1.getUserService)(isAuth.token);
    return res.json({ data: resProcessingData });
};
exports.getUserController = getUserController;
const editUserController = async (req, res) => {
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    let resProcessingData = await (0, user_service_1.editUserService)(req.body, isAuth.token);
    return res.json({ data: resProcessingData });
};
exports.editUserController = editUserController;
