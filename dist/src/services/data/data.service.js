"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_schema_1 = __importDefault(require("../../models/Notes/note.schema"));
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const wordfile_schema_1 = __importDefault(require("../../models/WordFiles/wordfile.schema"));
const content_schema_1 = __importDefault(require("../../models/content/content.schema"));
const folder_content_enum_1 = require("../../utils/enums/folder-content.enum");
const getDataService = async (data, token) => {
    const { pageIndex, pageSize, parentId, folderContentFilter, searchFilter } = data;
    let dataToSkip = pageSize * (pageIndex - 1);
    let dataLengthToReturn = pageSize;
    let retunrData = [];
    // debugger;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        let parentIdConverted;
        if (parentId !== null)
            parentIdConverted = new mongoose_1.default.Types.ObjectId(parentId);
        else
            parentIdConverted = parentId;
        let contentLength = 0;
        let wordFileLength = 0;
        let notesLength = 0;
        let query = {};
        if (searchFilter.trim().toLowerCase().length > 0) {
            query = {
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: parentIdConverted,
                name: { $regex: searchFilter.trim().toLowerCase(), $options: 'i' }
            };
        }
        else {
            query = {
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: parentIdConverted
            };
        }
        if (folderContentFilter === folder_content_enum_1.FolderContentEnum.Folder || folderContentFilter === folder_content_enum_1.FolderContentEnum.All)
            contentLength = await content_schema_1.default.count(query);
        if (folderContentFilter === folder_content_enum_1.FolderContentEnum.File || folderContentFilter === folder_content_enum_1.FolderContentEnum.All)
            wordFileLength = await wordfile_schema_1.default.count(query);
        if (folderContentFilter === folder_content_enum_1.FolderContentEnum.Note || folderContentFilter === folder_content_enum_1.FolderContentEnum.All)
            notesLength = await note_schema_1.default.count(query);
        const dataLength = contentLength + wordFileLength + notesLength;
        let numberOfPages = Math.ceil(dataLength / pageSize);
        if (pageIndex === numberOfPages) {
            dataLengthToReturn = dataLength - ((numberOfPages - 1) * pageSize);
        }
        let getData;
        // debugger;
        // get content
        if (folderContentFilter === folder_content_enum_1.FolderContentEnum.Folder || folderContentFilter === folder_content_enum_1.FolderContentEnum.All)
            if (dataToSkip >= contentLength) {
                dataToSkip -= contentLength;
            }
            else if (dataToSkip < contentLength) {
                if (dataLengthToReturn > (contentLength - dataToSkip)) {
                    getData = await content_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(contentLength - dataToSkip);
                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= retunrData.length;
                }
                else {
                    getData = await content_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(dataLengthToReturn - dataToSkip);
                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    return {
                        items: retunrData,
                        pages: numberOfPages,
                        currentIndex: pageIndex,
                        totalItems: dataLength
                    };
                }
            }
        // get word file
        if (folderContentFilter === folder_content_enum_1.FolderContentEnum.File || folderContentFilter === folder_content_enum_1.FolderContentEnum.All)
            if (dataToSkip >= wordFileLength) {
                dataToSkip -= wordFileLength;
            }
            else if (dataToSkip < wordFileLength) {
                if (dataLengthToReturn > (wordFileLength - dataToSkip)) {
                    getData = await wordfile_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(wordFileLength - dataToSkip);
                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= retunrData.length;
                }
                else {
                    getData = await wordfile_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(dataLengthToReturn - dataToSkip);
                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    return {
                        items: retunrData,
                        pages: numberOfPages,
                        currentIndex: pageIndex,
                        totalItems: dataLength
                    };
                }
            }
        // get notes
        if (folderContentFilter === folder_content_enum_1.FolderContentEnum.Note || folderContentFilter === folder_content_enum_1.FolderContentEnum.All)
            if (dataToSkip >= notesLength) {
                dataToSkip -= notesLength;
            }
            else if (dataToSkip < notesLength) {
                if (dataLengthToReturn > (notesLength - dataToSkip)) {
                    getData = await note_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(notesLength - dataToSkip);
                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= retunrData.length;
                }
                else {
                    getData = await note_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(dataLengthToReturn - dataToSkip);
                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    return {
                        items: retunrData,
                        pages: numberOfPages,
                        currentIndex: pageIndex,
                        totalItems: dataLength
                    };
                }
            }
    }
    catch (error) {
        return 400;
    }
};
exports.getDataService = getDataService;
