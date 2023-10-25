import path from "path";
import User from "../../models/Users/user.schema";
import Gallery from "../../models/Gallery/gallery.schema";
import { NoteTypeEnum } from "../../utils/enums/note-type.enum";
import { rootPath } from "../../..";
import fs from "fs";

export const createGalleryService = async (req: any, token: string) => {

    try {
        const user = await User.findOne({token: token});

        let returnFiles: any[] = [];

        const files = req.files

        Object.keys(files).forEach(key => {
            const filepath = path.join(rootPath, files[key].name);

            let file = {
                fullPath: `https://${req.headers.host}/${files[key].name}`,
                fileName: files[key].name,
                type: files[key].mimetype.includes("image") ? NoteTypeEnum.Image : NoteTypeEnum.Video
            }

            returnFiles.push(file)

            files[key]?.mv(filepath, (err: any) => {
                if (err) return 500;
            })
        })

        let newReturnFiles: any[] = [];
        for(let i = 0; i < returnFiles.length; i++) {
            let file = returnFiles[i];

            let newGalleryFile = await Gallery.create({
                ...file,
                user: user?._id,
                isOnServer: true
            });
            newGalleryFile.save();

            newReturnFiles.push({
                ...file,
                id: newGalleryFile._id,
                isOnServer: true
            })
        }
        
        return newReturnFiles;

    } catch (error) {
        
        return 400;
    }
    
}

export const deleteGalleryService = async (id: any) => {
    try {
        let file = await Gallery.findById(id);

        const pathFileToDelete = path.join(rootPath, file?.fileName ?? "");
        fs.unlink(pathFileToDelete, (err) => {})
        await Gallery.deleteOne({_id: file?._id});

        return 200;
    } catch (error) {
        return 400;
    }
}