"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editNoteService = exports.deleteNoteFileService = exports.getNoteService = exports.getNotesService = exports.createNoteService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_schema_1 = __importDefault(require("../../models/Notes/note.schema"));
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const createNoteService = async (data, token, isMobile) => {
    let dataContent;
    // debugger;
    try {
        let user;
        if (isMobile) {
            user = await user_schema_1.default.findOne({ token: token });
        }
        else {
            user = await user_schema_1.default.findOne({ tokenNonMobile: token });
        }
        if (user === null)
            return 400;
        if (data.parentId !== null)
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id, parentId: new mongoose_1.default.Types.ObjectId(data.parentId) });
        else
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id });
        let newNote = await note_schema_1.default.create(dataContent);
        newNote.save();
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.createNoteService = createNoteService;
const getNotesService = async (parentId, token, isMobile) => {
    try {
        let parentIdConverted;
        if (parentId !== null)
            parentIdConverted = new mongoose_1.default.Types.ObjectId(parentId);
        else
            parentIdConverted = parentId;
        let user;
        if (isMobile) {
            user = await user_schema_1.default.findOne({ token: token });
        }
        else {
            user = await user_schema_1.default.findOne({ tokenNonMobile: token });
        }
        if (user === null)
            return 400;
        let content = await note_schema_1.default.find({
            user: user === null || user === void 0 ? void 0 : user._id,
            parentId: parentIdConverted
        });
        return content;
    }
    catch (error) {
        return 400;
    }
};
exports.getNotesService = getNotesService;
const getNoteService = async (noteId) => {
    try {
        let note = await note_schema_1.default.findOne({ _id: noteId });
        return note;
    }
    catch (error) {
        return 400;
    }
};
exports.getNoteService = getNoteService;
const deleteNoteFileService = async (noteId) => {
    try {
        await note_schema_1.default.deleteOne({ _id: noteId });
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.deleteNoteFileService = deleteNoteFileService;
const editNoteService = async (data, token, isMobile) => {
    let dataContent;
    try {
        let user;
        if (isMobile) {
            user = await user_schema_1.default.findOne({ token: token });
        }
        else {
            user = await user_schema_1.default.findOne({ tokenNonMobile: token });
        }
        if (user === null)
            return 400;
        if (data.parentId !== null)
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id, parentId: new mongoose_1.default.Types.ObjectId(data.parentId) });
        else
            dataContent = Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user._id });
        let newFolder = await note_schema_1.default.findOneAndUpdate({ _id: data._id }, dataContent);
        newFolder === null || newFolder === void 0 ? void 0 : newFolder.save();
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.editNoteService = editNoteService;
