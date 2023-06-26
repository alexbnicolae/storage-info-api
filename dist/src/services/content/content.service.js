"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolderService = exports.editFolderService = exports.getContentService = exports.createFolderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const content_schema_1 = __importDefault(require("../../models/content/content.schema"));
const wordfile_schema_1 = __importDefault(require("../../models/WordFiles/wordfile.schema"));
const note_schema_1 = __importDefault(require("../../models/Notes/note.schema"));
const createFolderService = async (data, token) => {
    let dataContent;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (data.parentId !== null)
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id, parentId: new mongoose_1.default.Types.ObjectId(data.parentId) });
        else
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id });
        let newFolder = await content_schema_1.default.create(dataContent);
        newFolder.save();
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.createFolderService = createFolderService;
const getContentService = async (parentId, token) => {
    try {
        let parentIdConverted;
        if (parentId !== null)
            parentIdConverted = new mongoose_1.default.Types.ObjectId(parentId);
        else
            parentIdConverted = parentId;
        const user = await user_schema_1.default.findOne({ token: token });
        let content = await content_schema_1.default.find({
            user: user === null || user === void 0 ? void 0 : user._id,
            parentId: parentIdConverted
        });
        return content;
    }
    catch (error) {
        return 400;
    }
};
exports.getContentService = getContentService;
const editFolderService = async (data, token) => {
    let dataContent;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (data.parentId !== null)
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id, parentId: new mongoose_1.default.Types.ObjectId(data.parentId) });
        else
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id });
        let newFolder = await content_schema_1.default.findOneAndUpdate({ _id: data._id }, dataContent);
        newFolder === null || newFolder === void 0 ? void 0 : newFolder.save();
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.editFolderService = editFolderService;
const deleteFolderService = async (folderId, token) => {
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        let query = {
            user: user === null || user === void 0 ? void 0 : user._id,
            parentId: folderId
        };
        let content = await content_schema_1.default.count(query);
        if (content > 0)
            return {
                code: 400,
                messageTag: "folderNotEmpty"
            };
        content = await wordfile_schema_1.default.count(query);
        if (content > 0)
            return {
                code: 400,
                messageTag: "folderNotEmpty"
            };
        content = await note_schema_1.default.count(query);
        if (content > 0)
            return {
                code: 400,
                messageTag: "folderNotEmpty"
            };
        await content_schema_1.default.deleteOne({ _id: folderId });
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.deleteFolderService = deleteFolderService;
