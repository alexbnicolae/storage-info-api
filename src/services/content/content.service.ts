import mongoose from "mongoose";
import User from "../../models/Users/user.schema";
import Content from "../../models/content/content.schema";
import { ContentSchemaDto } from "../../models/content/content.schema.types";
import Wordfile from "../../models/WordFiles/wordfile.schema";
import Note from "../../models/Notes/note.schema";

export const createFolderService = async (data: ContentSchemaDto, token: string, isMobile: boolean) => {
    
    let dataContent;
    
    try {
        let user;
        if(isMobile) {
            user = await User.findOne({token: token});
        } else {
            user = await User.findOne({tokenNonMobile: token});
        }

        if(user === null) return 400;

        if(data.parentId !== null)
            dataContent = {
                ...data,
                user: user?._id,
                parentId: new mongoose.Types.ObjectId((data.parentId as string))
            }
        else dataContent = {
            ...data,
            user: user?._id,
        };
        
        let newFolder = await Content.create(dataContent);
        newFolder.save()

        return 200;
    } catch (error) {
        return 400;
    }
    
}

export const getContentService = async (parentId: any, token: string, isMobile: boolean) => {
    try {
        let parentIdConverted;
        
        if(parentId !== null)
            parentIdConverted = new mongoose.Types.ObjectId((parentId as string));
        else parentIdConverted = parentId;

        let user;
        if(isMobile) {
            user = await User.findOne({token: token});
        } else {
            user = await User.findOne({tokenNonMobile: token});
        }

        let content = await Content.find({
            user: user?._id,
            parentId: parentIdConverted
        })

        return content;
    } catch (error) {
        return 400;
    }
}


export const editFolderService = async (data: ContentSchemaDto, token: string, isMobile: boolean) => {
    let dataContent;
    
    try {
        let user;
        if(isMobile) {
            user = await User.findOne({token: token});
        } else {
            user = await User.findOne({tokenNonMobile: token});
        }

        if(user === null) return 400;

        if(data.parentId !== null)
            dataContent = {
                ...data,
                user: user?._id,
                parentId: new mongoose.Types.ObjectId((data.parentId as string))
            }
        else dataContent = {
            ...data,
            user: user?._id,
        };
        
        let newFolder = await Content.findOneAndUpdate({_id: data._id}, dataContent);
        newFolder?.save()

        return 200;
    } catch (error) {
        return 400;
    }
}   

export const deleteFolderService = async (folderId: string | undefined, token: string, isMobile: boolean) => {

    try {
        let user;
        if(isMobile) {
            user = await User.findOne({token: token});
        } else {
            user = await User.findOne({tokenNonMobile: token});
        }

        if(user === null) return 400;

        let query = {
            user: user?._id,
            parentId: folderId
        }

        let content = await Content.count(query)

        if(content > 0)
            return {
                code: 400,
                messageTag: "folderNotEmpty"
            }

        content = await Wordfile.count(query)

        if(content > 0)
            return {
                code: 400,
                messageTag: "folderNotEmpty"
            }

        content = await Note.count(query)

        if(content > 0)
            return {
                code: 400,
                messageTag: "folderNotEmpty"
            }

        await Content.deleteOne({_id: folderId});

        return 200;
    } catch (error) {
        return 400;
    }
}