"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWordFileController = exports.editWordFileController = exports.getWordFileController = exports.createWordFileController = void 0;
const wordfile_validators_1 = require("../../routes/validators/wordfile.validators");
const wordfile_service_1 = require("../../services/wordfile/wordfile.service");
const getToken_1 = require("../../utils/getToken");
const createWordFileController = async (req, res) => {
    // verify if the user sent the data correctly
    const { error, value } = wordfile_validators_1.createWordFileValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if (req.headers["platform"].toLowerCase().includes("mobile"))
        isMobile = true;
    // process data
    let resProcessingData = await (0, wordfile_service_1.createWordFileService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.createWordFileController = createWordFileController;
const getWordFileController = async (req, res) => {
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if (req.headers["platform"].toLowerCase().includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, wordfile_service_1.getWordFileService)(req.body.parentId, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.getWordFileController = getWordFileController;
const editWordFileController = async (req, res) => {
    // verify if the user sent the data correctly
    const { error, value } = wordfile_validators_1.editWordFileValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if (req.headers["platform"].toLowerCase().includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, wordfile_service_1.editWordFileService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.editWordFileController = editWordFileController;
const deleteWordFileController = async (req, res) => {
    // verify if the user sent the data correctly
    const { error, value } = wordfile_validators_1.deleteWordFileValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    let resProcessingData = await (0, wordfile_service_1.deleteWordFileService)(req.body.id);
    return res.json({ data: resProcessingData });
};
exports.deleteWordFileController = deleteWordFileController;
