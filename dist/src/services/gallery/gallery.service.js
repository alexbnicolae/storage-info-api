"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGalleryService = exports.createGalleryService = void 0;
const path_1 = __importDefault(require("path"));
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const gallery_schema_1 = __importDefault(require("../../models/Gallery/gallery.schema"));
const note_type_enum_1 = require("../../utils/enums/note-type.enum");
const __1 = require("../../..");
const fs_1 = __importDefault(require("fs"));
const createGalleryService = async (req, token, isMobile) => {
    try {
        let user;
        if (isMobile) {
            user = await user_schema_1.default.findOne({ token: token });
        }
        else {
            user = await user_schema_1.default.findOne({ tokenNonMobile: token });
        }
        let returnFiles = [];
        const files = req.files;
        Object.keys(files).forEach(key => {
            var _a;
            const filepath = path_1.default.join(__1.rootPath, files[key].name);
            let file = {
                fileName: files[key].name,
                type: files[key].mimetype.includes("image") ? note_type_enum_1.NoteTypeEnum.Image : note_type_enum_1.NoteTypeEnum.Video
            };
            returnFiles.push(file);
            (_a = files[key]) === null || _a === void 0 ? void 0 : _a.mv(filepath, (err) => {
                if (err)
                    return 500;
            });
        });
        let newReturnFiles = [];
        for (let i = 0; i < returnFiles.length; i++) {
            let file = returnFiles[i];
            let newGalleryFile = await gallery_schema_1.default.create(Object.assign(Object.assign({}, file), { user: user === null || user === void 0 ? void 0 : user._id, isOnServer: true }));
            newGalleryFile.save();
            newReturnFiles.push(Object.assign(Object.assign({}, file), { id: newGalleryFile._id, isOnServer: true }));
        }
        return newReturnFiles;
    }
    catch (error) {
        return 400;
    }
};
exports.createGalleryService = createGalleryService;
const deleteGalleryService = async (id) => {
    var _a;
    try {
        let file = await gallery_schema_1.default.findById(id);
        const pathFileToDelete = path_1.default.join(__1.rootPath, (_a = file === null || file === void 0 ? void 0 : file.fileName) !== null && _a !== void 0 ? _a : "");
        fs_1.default.unlink(pathFileToDelete, (err) => { });
        await gallery_schema_1.default.deleteOne({ _id: file === null || file === void 0 ? void 0 : file._id });
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.deleteGalleryService = deleteGalleryService;
