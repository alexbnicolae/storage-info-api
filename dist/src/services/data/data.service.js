"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDataService = exports.deleteDataService = exports.editDataService = exports.getDataService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_schema_1 = __importDefault(require("../../models/Notes/note.schema"));
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const wordfile_schema_1 = __importDefault(require("../../models/WordFiles/wordfile.schema"));
const content_schema_1 = __importDefault(require("../../models/content/content.schema"));
const folder_content_enum_1 = require("../../utils/enums/folder-content.enum");
const note_type_enum_1 = require("../../utils/enums/note-type.enum");
const getDataService = async (data, token) => {
    const { pageIndex, pageSize, parentId, folderContentFilter, searchFilter } = data;
    let dataToSkip = pageSize * (pageIndex - 1);
    let dataLengthToReturn = pageSize;
    let returnData = [];
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
                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= getData.length;
                }
                else {
                    getData = await content_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(dataLengthToReturn);
                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    return {
                        items: returnData,
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
                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= getData.length;
                }
                else {
                    getData = await wordfile_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(dataLengthToReturn);
                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    return {
                        items: returnData,
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
                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= getData.length;
                }
                else {
                    getData = await note_schema_1.default
                        .find(query)
                        .sort({ _id: 1 })
                        .skip(dataToSkip)
                        .limit(dataLengthToReturn);
                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    return {
                        items: returnData,
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
const editDataService = async (data, token) => {
    const { items, allItemsSelected, newParentId, oldParentId } = data;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (!allItemsSelected) {
            let folders = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Folder && f.id != newParentId);
            let updateFolders = folders.map(m => {
                return {
                    updateOne: {
                        filter: {
                            _id: m.id
                        },
                        update: {
                            $set: {
                                parentId: newParentId
                            }
                        }
                    }
                };
            });
            let wordFiles = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.File);
            let updateWordFiles = wordFiles.map(m => {
                return {
                    updateOne: {
                        filter: {
                            _id: m.id
                        },
                        update: {
                            $set: {
                                parentId: newParentId
                            }
                        }
                    }
                };
            });
            let notes = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Note);
            let updateNotes = notes.map(m => {
                return {
                    updateOne: {
                        filter: {
                            _id: m === null || m === void 0 ? void 0 : m.id
                        },
                        update: {
                            $set: {
                                parentId: newParentId
                            }
                        }
                    }
                };
            });
            let respFolders = await content_schema_1.default.bulkWrite(updateFolders);
            let respWordFiles = await wordfile_schema_1.default.bulkWrite(updateWordFiles);
            let respNotes = await note_schema_1.default.bulkWrite(updateNotes);
        }
        else {
            // debugger;
            let folders = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Folder)
                .map(m => m.id);
            let foldersToUpdate = (await content_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $nin: folders
                }
            })).map(m => m._id);
            let wordFiles = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.File)
                .map(m => m.id);
            let wordFilesToUpdate = (await wordfile_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $nin: wordFiles
                }
            })).map(m => m._id);
            let notes = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Note)
                .map(m => m.id);
            let notesToUpdate = (await note_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $nin: notes
                }
            })).map(m => m._id);
            let updateFolders = foldersToUpdate.map(m => {
                return {
                    updateOne: {
                        filter: {
                            _id: m
                        },
                        update: {
                            $set: {
                                parentId: newParentId
                            }
                        }
                    }
                };
            });
            let updateWordFiles = wordFilesToUpdate.map(m => {
                return {
                    updateOne: {
                        filter: {
                            _id: m
                        },
                        update: {
                            $set: {
                                parentId: newParentId
                            }
                        }
                    }
                };
            });
            let updateNotes = notesToUpdate.map(m => {
                return {
                    updateOne: {
                        filter: {
                            _id: m
                        },
                        update: {
                            $set: {
                                parentId: newParentId
                            }
                        }
                    }
                };
            });
            let respFolders = await content_schema_1.default.bulkWrite(updateFolders);
            let respWordFiles = await wordfile_schema_1.default.bulkWrite(updateWordFiles);
            let respNotes = await note_schema_1.default.bulkWrite(updateNotes);
        }
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.editDataService = editDataService;
const deleteDataService = async (data, token) => {
    const { items, allItemsSelected, parentId } = data;
    // debugger;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (!allItemsSelected) {
            let folders = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Folder);
            //check if the folders are empty
            for (let i = 0; i < folders.length; i++) {
                let folder = folders[i];
                let query = {
                    parentId: folder.id
                };
                let childFolders = await content_schema_1.default.count(query);
                if (childFolders > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    };
                let childWordFiles = await wordfile_schema_1.default.count(query);
                if (childWordFiles > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    };
                let childNotes = await note_schema_1.default.count(query);
                if (childNotes > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    };
            }
            //if the code reach this stage, so the folder is empty
            let wordFiles = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.File);
            let notes = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Note);
            let deleteFolders = folders.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m.id
                        }
                    }
                };
            });
            let deleteWordFiles = wordFiles.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m.id
                        }
                    }
                };
            });
            let deleteNotes = notes.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m.id
                        }
                    }
                };
            });
            let respFolders = await content_schema_1.default.bulkWrite(deleteFolders);
            let respWordFiles = await wordfile_schema_1.default.bulkWrite(deleteWordFiles);
            let respNotes = await note_schema_1.default.bulkWrite(deleteNotes);
            return {
                code: 200,
                contentToDelete: []
            };
        }
        else {
            // debugger;
            let folders = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Folder)
                .map(m => m.id);
            let foldersToDelete = (await content_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: parentId,
                _id: {
                    $nin: folders
                }
            })).map(m => m._id);
            //check if the folders are empty
            for (let i = 0; i < foldersToDelete.length; i++) {
                let folder = foldersToDelete[i];
                let query = {
                    parentId: folder
                };
                let childFolders = await content_schema_1.default.count(query);
                if (childFolders > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    };
                let childWordFiles = await wordfile_schema_1.default.count(query);
                if (childWordFiles > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    };
                let childNotes = await note_schema_1.default.count(query);
                if (childNotes > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    };
            }
            //if the code reach this stage, so the folder is empty
            let wordFiles = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.File)
                .map(m => m.id);
            let wordFIlesToDelete = (await wordfile_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: parentId,
                _id: {
                    $nin: wordFiles
                }
            })).map(m => m._id);
            let notes = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Note)
                .map(m => m.id);
            let notesToDelete = (await note_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: parentId,
                _id: {
                    $nin: notes
                }
            })).map(m => ({
                id: m._id,
                content: m.content
            }));
            let notesToReturn = notesToDelete
                .map(m => m.content.filter(f => f.type !== note_type_enum_1.NoteTypeEnum.Text))
                .reduce((prev, current) => [...prev, ...current], []);
            let deleteFolders = foldersToDelete.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m
                        }
                    }
                };
            });
            let deleteWordFiles = wordFIlesToDelete.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m
                        }
                    }
                };
            });
            let deleteNotes = notesToDelete.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m.id
                        }
                    }
                };
            });
            let respFolders = await content_schema_1.default.bulkWrite(deleteFolders);
            let respWordFiles = await wordfile_schema_1.default.bulkWrite(deleteWordFiles);
            let respNotes = await note_schema_1.default.bulkWrite(deleteNotes);
            return {
                code: 200,
                contentToDelete: notesToReturn
            };
        }
    }
    catch (error) {
        return 400;
    }
};
exports.deleteDataService = deleteDataService;
const copyDataService = async (data, token) => {
    const { items, allItemsSelected, newParentId, oldParentId } = data;
    try {
        const user = await user_schema_1.default.findOne({ token: token });
        if (!allItemsSelected) {
            let folders = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Folder && f.id != newParentId)
                .map(m => m.id);
            let foldersToCopy = (await content_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $in: folders
                }
            })).map(m => ({
                user: user === null || user === void 0 ? void 0 : user._id,
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword,
                isDuplicate: true
            }));
            let wordFiles = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.File)
                .map(m => m.id);
            let wordFilesToCopy = (await wordfile_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $in: wordFiles
                }
            })).map(m => ({
                user: user === null || user === void 0 ? void 0 : user._id,
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword,
                isDuplicate: true
            }));
            let notes = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Note)
                .map(m => m.id);
            let notesToCopy = (await note_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $in: notes
                }
            })).map(m => ({
                user: user === null || user === void 0 ? void 0 : user._id,
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword,
                isDuplicate: true
            }));
            let respFolders = await content_schema_1.default.insertMany(foldersToCopy);
            let respWordFiles = await wordfile_schema_1.default.insertMany(wordFilesToCopy);
            let respNotes = await note_schema_1.default.insertMany(notesToCopy);
        }
        else {
            // debugger;
            let folders = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Folder)
                .map(m => m.id);
            let foldersToCopy = (await content_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $nin: folders
                }
            })).map(m => ({
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword
            }));
            let wordFiles = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.File)
                .map(m => m.id);
            let wordFilesToCopy = (await wordfile_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $nin: wordFiles
                }
            })).map(m => ({
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword
            }));
            let notes = items
                .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Note)
                .map(m => m.id);
            let notesToCopy = (await note_schema_1.default.find({
                user: user === null || user === void 0 ? void 0 : user._id,
                parentId: oldParentId,
                _id: {
                    $nin: notes
                }
            })).map(m => ({
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword
            }));
            let respFolders = await content_schema_1.default.insertMany(foldersToCopy);
            let respWordFiles = await wordfile_schema_1.default.insertMany(wordFilesToCopy);
            let respNotes = await note_schema_1.default.insertMany(notesToCopy);
        }
        return 200;
    }
    catch (error) {
        return 400;
    }
};
exports.copyDataService = copyDataService;
