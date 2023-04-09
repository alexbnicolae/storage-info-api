"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWordFileController = exports.createWordFileController = void 0;
const verifyAuthorization_1 = require("../../utils/verifyAuthorization");
const wordfile_validators_1 = require("../../routes/validators/wordfile.validators");
const wordfile_service_1 = require("../../services/wordfile/wordfile.service");
const createWordFileController = async (req, res) => {
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    // verify if the user sent the data correctly
    const { error, value } = wordfile_validators_1.createWordFileValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    // process data
    let resProcessingData = await (0, wordfile_service_1.createWordFileService)(req.body, isAuth.token);
    return res.json({ data: resProcessingData });
};
exports.createWordFileController = createWordFileController;
const getWordFileController = async (req, res) => {
    // debugger;
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    // // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    let resProcessingData = await (0, wordfile_service_1.getWordFileService)(req.body.parentId, isAuth.token);
    return res.json({ data: resProcessingData });
};
exports.getWordFileController = getWordFileController;
