"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWordFileService = exports.editWordFileService = exports.getWordFileService = exports.createWordFileService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const wordfile_schema_1 = __importDefault(require("../../models/WordFiles/wordfile.schema"));
const createWordFileService = async (data, token) => {
    let dataContent;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (data.parentId !== null)
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id, parentId: new mongoose_1.default.Types.ObjectId(data.parentId) });
        else
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id });
        let newFolder = await wordfile_schema_1.default.create(dataContent);
        newFolder.save();
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.createWordFileService = createWordFileService;
const getWordFileService = async (parentId, token) => {
    try {
        let parentIdConverted;
        if (parentId !== null)
            parentIdConverted = new mongoose_1.default.Types.ObjectId(parentId);
        else
            parentIdConverted = parentId;
        const user = await user_schema_1.default.findOne({ token: token });
        let content = await wordfile_schema_1.default.find({
            user: user === null || user === void 0 ? void 0 : user._id,
            parentId: parentIdConverted
        });
        return content;
    }
    catch (error) {
        return 400;
    }
};
exports.getWordFileService = getWordFileService;
const editWordFileService = async (data, token) => {
    let dataContent;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (data.parentId !== null)
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id, parentId: new mongoose_1.default.Types.ObjectId(data.parentId) });
        else
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id });
        let newFolder = await wordfile_schema_1.default.findOneAndUpdate({ _id: data._id }, dataContent);
        newFolder === null || newFolder === void 0 ? void 0 : newFolder.save();
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.editWordFileService = editWordFileService;
const deleteWordFileService = async (fileId) => {
    try {
        await wordfile_schema_1.default.deleteOne({ _id: fileId });
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.deleteWordFileService = deleteWordFileService;
