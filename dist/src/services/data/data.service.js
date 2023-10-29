"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataService = exports.editDataService = exports.getDataService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_schema_1 = __importDefault(require("../../models/Notes/note.schema"));
const user_schema_1 = __importDefault(require("../../models/Users/user.schema"));
const wordfile_schema_1 = __importDefault(require("../../models/WordFiles/wordfile.schema"));
const content_schema_1 = __importDefault(require("../../models/content/content.schema"));
const folder_content_enum_1 = require("../../utils/enums/folder-content.enum");
const note_type_enum_1 = require("../../utils/enums/note-type.enum");
const gallery_schema_1 = __importDefault(require("../../models/Gallery/gallery.schema"));
const path_1 = __importDefault(require("path"));
const __1 = require("../../..");
const fs_1 = __importDefault(require("fs"));
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
    const { items, allItemsSelected, parentId, currentFilter } = data;
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
            if (notes.length > 0) {
                let getNotes = [];
                getNotes = (await note_schema_1.default.find({
                    user: user === null || user === void 0 ? void 0 : user._id,
                    parentId: parentId,
                    _id: {
                        $in: notes.map(m => m.id)
                    }
                }))
                    .map(m => m.content)
                    .reduce((prev, current) => [...prev, ...current], [])
                    .filter((f) => [note_type_enum_1.NoteTypeEnum.Image, note_type_enum_1.NoteTypeEnum.Video].includes(f.type));
                let allContent = [
                    ...getNotes.map((m) => m.content).filter(f => f),
                    ...getNotes.map((m) => m.additional).filter(f => f)
                ];
                allContent = allContent.map(content => {
                    if (!(typeof content === 'string'))
                        return {
                            id: content === null || content === void 0 ? void 0 : content.id,
                            name: content === null || content === void 0 ? void 0 : content.fileName
                        };
                    return null;
                })
                    .filter(f => f !== null);
                if (allContent.length > 0) {
                    let deleteGallery = allContent.map(m => {
                        return {
                            deleteOne: {
                                filter: {
                                    _id: m.id
                                }
                            }
                        };
                    });
                    await gallery_schema_1.default.bulkWrite(deleteGallery);
                    allContent.map(m => {
                        var _a;
                        const pathFileToDelete = path_1.default.join(__1.rootPath, (_a = m === null || m === void 0 ? void 0 : m.name) !== null && _a !== void 0 ? _a : "");
                        fs_1.default.unlink(pathFileToDelete, (err) => { });
                    });
                }
            }
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
            let foldersToDelete;
            let wordFIlesToDelete;
            let notesToDelete;
            let notesToReturn;
            if (currentFilter === folder_content_enum_1.FolderContentEnum.Folder || currentFilter === folder_content_enum_1.FolderContentEnum.All) {
                let folders = items
                    .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Folder)
                    .map(m => m.id);
                foldersToDelete = (await content_schema_1.default.find({
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
            }
            //if the code reach this stage, so the folder is empty
            if (currentFilter === folder_content_enum_1.FolderContentEnum.File || currentFilter === folder_content_enum_1.FolderContentEnum.All) {
                let wordFiles = items
                    .filter(f => f.type === folder_content_enum_1.FolderContentEnum.File)
                    .map(m => m.id);
                wordFIlesToDelete = (await wordfile_schema_1.default.find({
                    user: user === null || user === void 0 ? void 0 : user._id,
                    parentId: parentId,
                    _id: {
                        $nin: wordFiles
                    }
                })).map(m => m._id);
            }
            if (currentFilter === folder_content_enum_1.FolderContentEnum.Note || currentFilter === folder_content_enum_1.FolderContentEnum.All) {
                let notes = items
                    .filter(f => f.type === folder_content_enum_1.FolderContentEnum.Note)
                    .map(m => m.id);
                if (notes.length > 0) {
                    let getNotes = [];
                    getNotes = (await note_schema_1.default.find({
                        user: user === null || user === void 0 ? void 0 : user._id,
                        parentId: parentId,
                        _id: {
                            $nin: notes
                        }
                    }))
                        .map(m => m.content)
                        .reduce((prev, current) => [...prev, ...current], [])
                        .filter((f) => [note_type_enum_1.NoteTypeEnum.Image, note_type_enum_1.NoteTypeEnum.Video].includes(f.type));
                    let allContent = [
                        ...getNotes.map((m) => m.content).filter(f => f),
                        ...getNotes.map((m) => m.additional).filter(f => f)
                    ];
                    allContent = allContent.map(content => {
                        if (!(typeof content === 'string'))
                            return {
                                id: content === null || content === void 0 ? void 0 : content.id,
                                name: content === null || content === void 0 ? void 0 : content.fileName
                            };
                        return null;
                    })
                        .filter(f => f !== null);
                    if (allContent.length > 0) {
                        let deleteGallery = allContent.map(m => {
                            return {
                                deleteOne: {
                                    filter: {
                                        _id: m.id
                                    }
                                }
                            };
                        });
                        await gallery_schema_1.default.bulkWrite(deleteGallery);
                        allContent.map(m => {
                            var _a;
                            const pathFileToDelete = path_1.default.join(__1.rootPath, (_a = m === null || m === void 0 ? void 0 : m.name) !== null && _a !== void 0 ? _a : "");
                            fs_1.default.unlink(pathFileToDelete, (err) => { });
                        });
                    }
                }
                notesToDelete = (await note_schema_1.default.find({
                    user: user === null || user === void 0 ? void 0 : user._id,
                    parentId: parentId,
                    _id: {
                        $nin: notes
                    }
                })).map(m => ({
                    id: m._id,
                    content: m.content
                }));
                notesToReturn = notesToDelete === null || notesToDelete === void 0 ? void 0 : notesToDelete.map(m => m.content.filter(f => f.type !== note_type_enum_1.NoteTypeEnum.Text)).reduce((prev, current) => [...prev, ...current], []).filter(f => typeof f === "string");
            }
            if (currentFilter === folder_content_enum_1.FolderContentEnum.Folder || currentFilter === folder_content_enum_1.FolderContentEnum.All) {
                let deleteFolders = foldersToDelete === null || foldersToDelete === void 0 ? void 0 : foldersToDelete.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m
                            }
                        }
                    };
                });
                let respFolders = await content_schema_1.default.bulkWrite(deleteFolders);
            }
            if (currentFilter === folder_content_enum_1.FolderContentEnum.File || currentFilter === folder_content_enum_1.FolderContentEnum.All) {
                let deleteWordFiles = wordFIlesToDelete === null || wordFIlesToDelete === void 0 ? void 0 : wordFIlesToDelete.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m
                            }
                        }
                    };
                });
                let respWordFiles = await wordfile_schema_1.default.bulkWrite(deleteWordFiles);
            }
            if (currentFilter === folder_content_enum_1.FolderContentEnum.Note || currentFilter === folder_content_enum_1.FolderContentEnum.All) {
                let deleteNotes = notesToDelete === null || notesToDelete === void 0 ? void 0 : notesToDelete.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m.id
                            }
                        }
                    };
                });
                let respNotes = await note_schema_1.default.bulkWrite(deleteNotes);
            }
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
