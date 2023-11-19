import mongoose from "mongoose";
import Note from "../../models/Notes/note.schema";
import User from "../../models/Users/user.schema";
import Wordfile from "../../models/WordFiles/wordfile.schema";
import Content from "../../models/content/content.schema";
import { FolderContentEnum } from "../../utils/enums/folder-content.enum";
import { NoteTypeEnum } from "../../utils/enums/note-type.enum";
import Gallery from "../../models/Gallery/gallery.schema";
import path from "path";
import { rootPath } from "../../..";
import fs from "fs";


export type EditModeItemType = {
    id?: string,
    type?: FolderContentEnum
}

export const getDataService = async (data: any, token: string, isMobile: boolean) => {
    
    const { pageIndex, pageSize, parentId, folderContentFilter, searchFilter } = data;
    
    let dataToSkip = pageSize * (pageIndex - 1);
    let dataLengthToReturn = pageSize;
    let returnData: any[] = [];
    
    try {
        let user;
        if(isMobile)
            user = await User.findOne({token: token});
        else    
            user = await User.findOne({tokenNonMobile: token});

        if(user === null) return 400;

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

export const editDataService = async(data: any, token: string, isMobile: boolean) => {

    const { items, allItemsSelected, newParentId, oldParentId } = data;
    
    try {
        let user;
        if(isMobile)
            user = await User.findOne({token: token});
        else    
            user = await User.findOne({tokenNonMobile: token});

        if(user === null) return 400;

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

export const deleteDataService = async(data: any, token: string, isMobile: boolean) => {
    const { items, allItemsSelected, parentId, currentFilter } = data;

    try {
        let user;
        if(isMobile)
            user = await User.findOne({token: token});
        else    
            user = await User.findOne({tokenNonMobile: token});

        if(user === null) return 400;

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

            
            if(notes.length > 0) {
                let getNotes: any[] = [];

                getNotes = (await Note.find({
                    user: user?._id,
                    parentId: parentId,
                    _id: {
                        $in: notes.map(m => m.id)
                    }
                }))
                .map(m => m.content) 
                .reduce(
                    (prev: any, current) => [...prev, ...current], []
                )     
                .filter((f: any) => [NoteTypeEnum.Image, NoteTypeEnum.Video].includes(f.type))

                let allContent = [
                    ...getNotes.map((m: any) => m.content).filter(f => f),
                    ...getNotes.map((m: any) => m.additional).filter(f => f)
                ];

                allContent = allContent.map(content => {
                    if(!(typeof content === 'string'))
                        return {
                            id: content?.id,
                            name: content?.fileName
                        };
                    return null
                })
                .filter(f => f !== null);

                if(allContent.length > 0){
                    let deleteGallery = allContent.map(m => {
                        return {
                            deleteOne: {
                                filter: {
                                    _id: m.id
                                }
                            }
                        }
                    })
    
                    await Gallery.bulkWrite(deleteGallery as any[]);

                    allContent.map(m => {
                        const pathFileToDelete = path.join(rootPath, m?.name ?? "");
                        fs.unlink(pathFileToDelete, (err) => {})
                    })
                }
            }

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
            let foldersToDelete;
            let wordFIlesToDelete;
            let notesToDelete;
            let notesToReturn;

            if(currentFilter === FolderContentEnum.Folder || currentFilter === FolderContentEnum.All) {
                let folders = (items as EditModeItemType[])
                    .filter(f => f.type === FolderContentEnum.Folder)
                    .map(m => m.id)
    
                foldersToDelete = (await Content.find({
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
            }

            //if the code reach this stage, so the folder is empty
            if(currentFilter === FolderContentEnum.File || currentFilter === FolderContentEnum.All) {
                let wordFiles = (items as EditModeItemType[])
                    .filter(f => f.type === FolderContentEnum.File)
                    .map(m => m.id)

                wordFIlesToDelete = (await Wordfile.find({
                        user: user?._id,
                        parentId: parentId,
                        _id: {
                            $nin: wordFiles
                        }
                    })).map(m => m._id)
            }

            if(currentFilter === FolderContentEnum.Note || currentFilter === FolderContentEnum.All) {
                let notes = (items as EditModeItemType[])
                    .filter(f => f.type === FolderContentEnum.Note)
                    .map(m => m.id)
    
                if(notes.length > 0) {
                    let getNotes: any[] = [];
    
                    getNotes = (await Note.find({
                        user: user?._id,
                        parentId: parentId,
                        _id: {
                            $nin: notes
                        }
                    }))
                    .map(m => m.content) 
                    .reduce(
                        (prev: any, current) => [...prev, ...current], []
                    )     
                    .filter((f: any) => [NoteTypeEnum.Image, NoteTypeEnum.Video].includes(f.type))
    
                    let allContent = [
                        ...getNotes.map((m: any) => m.content).filter(f => f),
                        ...getNotes.map((m: any) => m.additional).filter(f => f)
                    ];
    
                    allContent = allContent.map(content => {
                        if(!(typeof content === 'string'))
                            return {
                                id: content?.id,
                                name: content?.fileName
                            };
                        return null
                    })
                    .filter(f => f !== null);
    
                    if(allContent.length > 0){
                        let deleteGallery = allContent.map(m => {
                            return {
                                deleteOne: {
                                    filter: {
                                        _id: m.id
                                    }
                                }
                            }
                        })
    
                        await Gallery.bulkWrite(deleteGallery as any[]);
    
                        allContent.map(m => {
                            const pathFileToDelete = path.join(rootPath, m?.name ?? "");
                            fs.unlink(pathFileToDelete, (err) => {})
                        })
                    }
                }

                notesToDelete = (await Note.find({
                        user: user?._id,
                        parentId: parentId,
                        _id: {
                            $nin: notes
                        }
                    })).map(m => ({
                        id: m._id,
                        content: m.content
                    }))

                notesToReturn = notesToDelete?.map(m => m.content.filter(f => f.type !== NoteTypeEnum.Text))
                    .reduce(
                        (prev, current) => [...prev, ...current], []
                    )
                    .filter(f => typeof f === "string");
            }



            if(currentFilter === FolderContentEnum.Folder || currentFilter === FolderContentEnum.All) {
                let deleteFolders = foldersToDelete?.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m
                            }
                        }
                    }
                });

                let respFolders = await Content.bulkWrite(deleteFolders as any[]);
            }

            if(currentFilter === FolderContentEnum.File || currentFilter === FolderContentEnum.All) {
                let deleteWordFiles = wordFIlesToDelete?.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m
                            }
                        }
                    }
                });

                let respWordFiles = await Wordfile.bulkWrite(deleteWordFiles as any[]);
            }

            if(currentFilter === FolderContentEnum.Note || currentFilter === FolderContentEnum.All) {
                let deleteNotes = notesToDelete?.map(m => {
                    return {
                        deleteOne: {
                            filter: {
                                _id: m.id
                            }
                        }
                    }
                });
                
                let respNotes = await Note.bulkWrite(deleteNotes as any[]);
            }

            return {
                code: 200,
                contentToDelete: notesToReturn
            }
        }

    } catch (error) {
        return 400;
    }
}