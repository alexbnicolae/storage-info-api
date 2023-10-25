import { Router } from "express";
import { verifyAuthorization } from "../utils/verifyAuthorization";
import { createGalleryController, deleteGalleryController } from "../controllers/gallery/gallery.controller";
import fileUpload from "express-fileupload";

const galleryRouter = Router();

// create gallery file
galleryRouter.post(
    '/uploadFile',
    fileUpload({ 
        createParentPath: true,
    }), 
    verifyAuthorization, 
    createGalleryController
);

// delete note
galleryRouter.post('/deleteFile', verifyAuthorization, deleteGalleryController);

export default galleryRouter;