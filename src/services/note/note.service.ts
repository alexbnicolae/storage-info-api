import mongoose from "mongoose";
import Note from "../../models/Notes/note.schema";
import User from "../../models/Users/user.schema";

export const createNoteService = async (data: any, token: string, isMobile: boolean) => {

    let dataContent;
    // debugger;
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
        
        let newNote = await Note.create(dataContent);
        newNote.save()

        return 200;

    } catch (error) {
        
        return 400;
    }
    
}

export const getNotesService = async (parentId: any, token: string, isMobile: boolean) => {
   
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

        let content = await Note.find({
            user: user?._id,
            parentId: parentIdConverted
        })

        return content;
    } catch (error) {
    
        return 400;
    }
}

export const getNoteService = async (noteId: string | undefined) => {

    try {
        let note = await Note.findOne({_id: noteId});

        return note;
    } catch (error) {
        return 400;
    }
}

export const deleteNoteFileService = async (noteId: string | undefined) => {

    try {
        await Note.deleteOne({_id: noteId});

        return 200;
    } catch (error) {
        return 400;
    }
}

export const editNoteService = async (data: any, token: string, isMobile: boolean) => {
    
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
        
        let newFolder = await Note.findOneAndUpdate({_id: data._id}, dataContent);

        newFolder?.save()

        return 200;
    } catch (error) {
        return 400;
    }
    
}