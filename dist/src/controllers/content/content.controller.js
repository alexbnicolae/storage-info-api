"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolderController = exports.editFolderController = exports.getContentController = exports.createFolderController = void 0;
const content_validators_1 = require("../../routes/validators/content.validators");
const content_service_1 = require("../../services/content/content.service");
const getToken_1 = require("../../utils/getToken");
const createFolderController = async (req, res) => {
    var _a, _b;
    // verify if the user sent the data correctly
    const { error, value } = content_validators_1.createContentValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_b = (_a = req.headers["platform"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("mobile"))
        isMobile = true;
    // process data
    let resProcessingData = await (0, content_service_1.createFolderService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.createFolderController = createFolderController;
const getContentController = async (req, res) => {
    var _a, _b;
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_b = (_a = req.headers["platform"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, content_service_1.getContentService)(req.body.parentId, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.getContentController = getContentController;
const editFolderController = async (req, res) => {
    var _a, _b;
    // verify if the user sent the data correctly
    const { error, value } = content_validators_1.editContentValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_b = (_a = req.headers["platform"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, content_service_1.editFolderService)(req.body, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.editFolderController = editFolderController;
const deleteFolderController = async (req, res) => {
    var _a, _b;
    // verify if the user sent the data correctly
    const { error, value } = content_validators_1.deleteContentValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    //getToken
    let token = await (0, getToken_1.getToken)(req);
    let isMobile = req.headers["user-agent"].toLowerCase().includes("mobile");
    if ((_b = (_a = req.headers["platform"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("mobile"))
        isMobile = true;
    let resProcessingData = await (0, content_service_1.deleteFolderService)(req.body.id, token, isMobile);
    return res.json({ data: resProcessingData });
};
exports.deleteFolderController = deleteFolderController;
