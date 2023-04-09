import mongoose from "mongoose";
import Content from "../../models/Content/content.schema";
import User from "../../models/Users/user.schema";
import { ContentSchemaDto } from "../../models/Content/content.schema.types";

export const createFolderService = async (data: ContentSchemaDto, token: string) => {
    
    let dataContent;
    
    try {
        const user = await User.findOne({token: token});

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

export const getContentService = async (parentId: any, token: string) => {
    try {
        let parentIdConverted;
        
        if(parentId !== null)
            parentIdConverted = new mongoose.Types.ObjectId((parentId as string));
        else parentIdConverted = parentId;

        const user = await User.findOne({token: token});

        let content = await Content.find({
            user: user?._id,
            parentId: parentIdConverted
        })

        return content;
    } catch (error) {
        return 400;
    }
}