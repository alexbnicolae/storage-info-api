import mongoose from "mongoose";
import User from "../../models/Users/user.schema";
import Wordfile from "../../models/WordFiles/wordfile.schema";
import { WordFileSchemaDto } from "../../models/WordFiles/wordfile.schema.types";

export const createWordFileService = async (data: WordFileSchemaDto, token: string, isMobile: boolean) => {
    
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
        
        let newFolder = await Wordfile.create(dataContent);
        newFolder.save()

        return 200;
    } catch (error) {
        return 400;
    }
    
}

export const getWordFileService = async (parentId: any, token: string, isMobile: boolean) => {
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

        if(user === null) return 400;

        let content = await Wordfile.find({
            user: user?._id,
            parentId: parentIdConverted
        })

        return content;
    } catch (error) {
        return 400;
    }
}

export const editWordFileService = async (data: WordFileSchemaDto, token: string, isMobile: boolean) => {
    
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
        
        let newFolder = await Wordfile.findOneAndUpdate({_id: data._id}, dataContent);

        newFolder?.save()

        return 200;
    } catch (error) {
        return 400;
    }
    
}

export const deleteWordFileService = async (fileId: string | undefined) => {

    try {
        await Wordfile.deleteOne({_id: fileId});

        return 200;
    } catch (error) {
        return 400;
    }
}