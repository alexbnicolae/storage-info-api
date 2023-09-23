import mongoose from "mongoose";
import Note from "../../models/Notes/note.schema";
import User from "../../models/Users/user.schema";
import Wordfile from "../../models/WordFiles/wordfile.schema";
import Content from "../../models/content/content.schema";
import { FolderContentEnum } from "../../utils/enums/folder-content.enum";
import { NoteTypeEnum } from "../../utils/enums/note-type.enum";
import { debug } from "console";

export type EditModeItemType = {
    id?: string,
    type?: FolderContentEnum
}

export const getDataService = async (data: any, token: string) => {
    
    const { pageIndex, pageSize, parentId, folderContentFilter, searchFilter } = data;
    
    let dataToSkip = pageSize * (pageIndex - 1);
    let dataLengthToReturn = pageSize;
    let returnData: any[] = [];
    // debugger;
    try {
        const user = await User.findOne({token: token});

        let parentIdConverted;
        
        if(parentId !== null)
            parentIdConverted = new mongoose.Types.ObjectId((parentId as string));
        else parentIdConverted = parentId;
        
        let contentLength = 0;
        let wordFileLength = 0;
        let notesLength = 0;

        let query = {};

        if((searchFilter as string).trim().toLowerCase().length > 0) {
            query = {
                user: user?._id,
                parentId: parentIdConverted,
                name: { $regex: (searchFilter as string).trim().toLowerCase(), $options: 'i' }
            }
        } else {
            query = {
                user: user?._id,
                parentId: parentIdConverted
            }
        }


        if(folderContentFilter === FolderContentEnum.Folder || folderContentFilter === FolderContentEnum.All)
            contentLength = await Content.count(query);

        if(folderContentFilter === FolderContentEnum.File || folderContentFilter === FolderContentEnum.All)
            wordFileLength = await Wordfile.count(query);

        if(folderContentFilter === FolderContentEnum.Note || folderContentFilter === FolderContentEnum.All)
            notesLength = await Note.count(query);

        const dataLength = contentLength + wordFileLength + notesLength;

        let numberOfPages = Math.ceil(dataLength/pageSize);
        if(pageIndex === numberOfPages){
            dataLengthToReturn = dataLength - ((numberOfPages - 1) * pageSize)
        }

        let getData;
        // debugger;
        // get content
        if(folderContentFilter === FolderContentEnum.Folder || folderContentFilter === FolderContentEnum.All)
            if(dataToSkip >= contentLength) {
                dataToSkip -= contentLength 
            } else if(dataToSkip < contentLength) {
                if(dataLengthToReturn > (contentLength - dataToSkip)) {
                    getData = await Content
                            .find(query)
                            .sort({_id: 1})
                            .skip(dataToSkip)
                            .limit(contentLength - dataToSkip)

                    returnData = [
                        ...returnData,
                        ...getData
                    ];

                    dataToSkip = 0;
                    dataLengthToReturn -= getData.length;
                } else {
                    getData = await Content
                            .find(query)
                            .sort({_id: 1})
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
        if(folderContentFilter === FolderContentEnum.File || folderContentFilter === FolderContentEnum.All)
            if(dataToSkip >= wordFileLength) {
                dataToSkip -= wordFileLength 
            } else if(dataToSkip < wordFileLength) {
                if(dataLengthToReturn > (wordFileLength - dataToSkip)) {
                    getData = await Wordfile
                            .find(query)
                            .sort({_id: 1})
                            .skip(dataToSkip)
                            .limit(wordFileLength - dataToSkip)

                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= getData.length;
                } else {
                    getData = await Wordfile
                            .find(query)
                            .sort({_id: 1})
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
        if(folderContentFilter === FolderContentEnum.Note || folderContentFilter === FolderContentEnum.All)
            if(dataToSkip >= notesLength) {
                dataToSkip -= notesLength 
            } else if(dataToSkip < notesLength) {
                if(dataLengthToReturn > (notesLength - dataToSkip)) {
                    getData = await Note
                            .find(query)
                            .sort({_id: 1})
                            .skip(dataToSkip)
                            .limit(notesLength - dataToSkip)

                    returnData = [
                        ...returnData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= getData.length;
                } else {
                    getData = await Note
                            .find(query)
                            .sort({_id: 1})
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

    } catch (error) {
        return 400;
    }
}  

export const editDataService = async(data: any, token: string) => {

    const { items, allItemsSelected, newParentId, oldParentId } = data;
    
    try {
        const user = await User.findOne({token: token});

        if(!allItemsSelected) {
            let folders = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Folder && f.id != newParentId)
            
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
                }
            })
    
            let wordFiles = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.File)
    
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
                }
            })
    
            let notes = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Note)
    
            let updateNotes = notes.map(m => {
                return {
                    updateOne: {
                        filter: {
                            _id: m?.id
                        },
                        update: {
                            $set: {
                                parentId: newParentId
                            }
                        }
                    }
                }
            })
    
            let respFolders = await Content.bulkWrite(updateFolders);
            let respWordFiles = await Wordfile.bulkWrite(updateWordFiles);
            let respNotes = await Note.bulkWrite(updateNotes as any[]);
        } else {
            // debugger;
            let folders = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Folder)
                .map(m => m.id)

            let foldersToUpdate = (await Content.find({
                user: user?._id,
                parentId: oldParentId,
                _id: {
                    $nin: folders
                }
            })).map(m => m._id)
            
            let wordFiles = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.File)
                .map(m => m.id)

            let wordFilesToUpdate = (await Wordfile.find({
                    user: user?._id,
                    parentId: oldParentId,
                    _id: {
                        $nin: wordFiles
                    }
                })).map(m => m._id)
    
            let notes = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Note)
                .map(m => m.id)

            let notesToUpdate = (await Note.find({
                    user: user?._id,
                    parentId: oldParentId,
                    _id: {
                        $nin: notes
                    }
                })).map(m => m._id)

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
                }
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
                }
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
                }
            });

            let respFolders = await Content.bulkWrite(updateFolders as any[]);
            let respWordFiles = await Wordfile.bulkWrite(updateWordFiles as any[]);
            let respNotes = await Note.bulkWrite(updateNotes as any[]);
        }

        return 200;
    } catch (error) {
        return 400;
    }
}

export const deleteDataService = async(data: any, token: string) => {
    const { items, allItemsSelected, parentId } = data;
    // debugger;
    try {
        const user = await User.findOne({token: token});

        if(!allItemsSelected) {
            let folders = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Folder)
    
            //check if the folders are empty
            for(let i = 0; i < folders.length; i++) {
                let folder = folders[i];
    
                let query = {
                    parentId: folder.id
                }
    
                let childFolders = await Content.count(query);
    
                if(childFolders > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    }
    
                let childWordFiles = await Wordfile.count(query);
    
                if(childWordFiles > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    }
    
                let childNotes = await Note.count(query);
    
                if(childNotes > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    }
                
            }
    
            //if the code reach this stage, so the folder is empty
    
            let wordFiles = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.File)
    
            let notes = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Note)

            let deleteFolders = folders.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m.id
                        }
                    }
                }
            });

            let deleteWordFiles = wordFiles.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m.id
                        }
                    }
                }
            });

            let deleteNotes = notes.map(m => {
                return {
                    deleteOne: {
                        filter: {
                            _id: m.id
                        }
                    }
                }
            });

            let respFolders = await Content.bulkWrite(deleteFolders);
            let respWordFiles = await Wordfile.bulkWrite(deleteWordFiles);
            let respNotes = await Note.bulkWrite(deleteNotes as any[]);

            return {
                code: 200,
                contentToDelete: []
            };
        } else {
            // debugger;
            let folders = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Folder)
                .map(m => m.id)

            let foldersToDelete = (await Content.find({
                user: user?._id,
                parentId: parentId,
                _id: {
                    $nin: folders
                }
            })).map(m => m._id)

            //check if the folders are empty
            for(let i = 0; i < foldersToDelete.length; i++) {
                let folder = foldersToDelete[i];
    
                let query = {
                    parentId: folder
                }
    
                let childFolders = await Content.count(query);
    
                if(childFolders > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    }
    
                let childWordFiles = await Wordfile.count(query);
    
                if(childWordFiles > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    }
    
                let childNotes = await Note.count(query);
    
                if(childNotes > 0)
                    return {
                        code: 400,
                        messageTag: "folderNotEmpty"
                    }
                
            }

            //if the code reach this stage, so the folder is empty
            
            let wordFiles = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.File)
                .map(m => m.id)

            let wordFIlesToDelete = (await Wordfile.find({
                    user: user?._id,
                    parentId: parentId,
                    _id: {
                        $nin: wordFiles
                    }
                })).map(m => m._id)
    
            let notes = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Note)
                .map(m => m.id)

            let notesToDelete = (await Note.find({
                    user: user?._id,
                    parentId: parentId,
                    _id: {
                        $nin: notes
                    }
                })).map(m => ({
                    id: m._id,
                    content: m.content
                }))

            let notesToReturn = notesToDelete
                .map(m => m.content.filter(f => f.type !== NoteTypeEnum.Text))
                .reduce(
                    (prev, current) => [...prev, ...current], []
                )

                let deleteFolders = foldersToDelete.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m
                            }
                        }
                    }
                });
    
                let deleteWordFiles = wordFIlesToDelete.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m
                            }
                        }
                    }
                });
    
                let deleteNotes = notesToDelete.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m.id
                            }
                        }
                    }
                });
    
                let respFolders = await Content.bulkWrite(deleteFolders);
                let respWordFiles = await Wordfile.bulkWrite(deleteWordFiles);
                let respNotes = await Note.bulkWrite(deleteNotes as any[]);

                return {
                    code: 200,
                    contentToDelete: notesToReturn
                }
        }

    } catch (error) {
        return 400;
    }
}

export const copyDataService = async(data: any, token: string) => {

    const { items, allItemsSelected, newParentId, oldParentId } = data;
    
    try {
        const user = await User.findOne({token: token});

        if(!allItemsSelected) {
            let folders = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Folder && f.id != newParentId)
                .map(m => m.id)
            
            let foldersToCopy= (await Content.find({
                user: user?._id,
                parentId: oldParentId,
                _id: {
                    $in: folders
                }
            })).map(m => ({
                user: user?._id,
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword,
                isDuplicate: true
            }))

            let wordFiles = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.File)
                .map(m => m.id)
    
            let wordFilesToCopy = (await Wordfile.find({
                user: user?._id,
                parentId: oldParentId,
                _id: {
                    $in: wordFiles
                }
            })).map(m => ({
                user: user?._id,
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword,
                isDuplicate: true
            }))

            let notes = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Note)
                .map(m => m.id)
            
            let notesToCopy = (await Note.find({
                user: user?._id,
                parentId: oldParentId,
                _id: {
                    $in: notes
                }
            })).map(m => ({
                user: user?._id,
                name: m.name,
                type: m.type,
                parentId: newParentId,
                content: m.content,
                excrypted: m.encrypted,
                folderPassword: m.folderPassword,
                isDuplicate: true
            }))

            let respFolders = await Content.insertMany(foldersToCopy as any[]);
            let respWordFiles = await Wordfile.insertMany(wordFilesToCopy as any[]);
            let respNotes = await Note.insertMany(notesToCopy as any[]);
    
        } else {
            // debugger;
            let folders = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Folder)
                .map(m => m.id)

            let foldersToCopy = (await Content.find({
                user: user?._id,
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
            }))
            
            let wordFiles = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.File)
                .map(m => m.id)

            let wordFilesToCopy = (await Wordfile.find({
                    user: user?._id,
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
                }))
    
            let notes = (items as EditModeItemType[])
                .filter(f => f.type === FolderContentEnum.Note)
                .map(m => m.id)

            let notesToCopy = (await Note.find({
                    user: user?._id,
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
                }))

                let respFolders = await Content.insertMany(foldersToCopy as any[]);
                let respWordFiles = await Wordfile.insertMany(wordFilesToCopy as any[]);
                let respNotes = await Note.insertMany(notesToCopy as any[]);
        }

        return 200;
    } catch (error) {
        return 400;
    }
}