"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolderController = exports.editFolderController = exports.getContentController = exports.createFolderController = void 0;
const verifyAuthorization_1 = require("../../utils/verifyAuthorization");
const content_validators_1 = require("../../routes/validators/content.validators");
const content_service_1 = require("../../services/content/content.service");
const createFolderController = async (req, res) => {
    // debugger;
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    // verify if the user sent the data correctly
    const { error, value } = content_validators_1.createContentValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    // process data
    let resProcessingData = await (0, content_service_1.createFolderService)(req.body, isAuth.token);
    return res.json({ data: resProcessingData });
};
exports.createFolderController = createFolderController;
const getContentController = async (req, res) => {
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    // // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    let resProcessingData = await (0, content_service_1.getContentService)(req.body.parentId, isAuth.token);
    return res.json({ data: resProcessingData });
};
exports.getContentController = getContentController;
const editFolderController = async (req, res) => {
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    // verify if the user sent the data correctly
    const { error, value } = content_validators_1.editContentValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    let resProcessingData = await (0, content_service_1.editFolderService)(req.body, isAuth.token);
    return res.json({ data: resProcessingData });
};
exports.editFolderController = editFolderController;
const deleteFolderController = async (req, res) => {
    // verify if the user is authorized
    const isAuth = await (0, verifyAuthorization_1.verifyAuthorization)(req);
    if (isAuth.code !== 200)
        return res.json({ data: 401 });
    // verify if the user sent the data correctly
    const { error, value } = content_validators_1.deleteContentValidator.validate(req.body);
    if (error)
        return res.json({ data: 400 });
    let resProcessingData = await (0, content_service_1.deleteFolderService)(req.body.id);
    return res.json({ data: resProcessingData });
};
exports.deleteFolderController = deleteFolderController;
