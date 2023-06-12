import mongoose from "mongoose";
import Note from "../../models/Notes/note.schema";
import User from "../../models/Users/user.schema";
import Wordfile from "../../models/WordFiles/wordfile.schema";
import Content from "../../models/content/content.schema";
import { FolderContentEnum } from "../../utils/enums/folder-content.enum";

export const getDataService = async (data: any, token: string) => {
    
    const { pageIndex, pageSize, parentId, folderContentFilter, searchFilter } = data;
    
    let dataToSkip = pageSize * (pageIndex - 1);
    let dataLengthToReturn = pageSize;
    let retunrData: any[] = [];
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

                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];

                    dataToSkip = 0;
                    dataLengthToReturn -= retunrData.length;
                } else {
                    getData = await Content
                            .find(query)
                            .sort({_id: 1})
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

                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= retunrData.length;
                } else {
                    getData = await Wordfile
                            .find(query)
                            .sort({_id: 1})
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

                    retunrData = [
                        ...retunrData,
                        ...getData
                    ];
                    dataToSkip = 0;
                    dataLengthToReturn -= retunrData.length;
                } else {
                    getData = await Note
                            .find(query)
                            .sort({_id: 1})
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

    } catch (error) {
        return 400;
    }
}  