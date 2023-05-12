import { Router } from 'express';
import { createFolderController, deleteFolderController, editFolderController, getContentController } from '../controllers/content/content.controller';
import { verifyAuthorization } from '../utils/verifyAuthorization';

const contentRouter = Router();

// create folder
contentRouter.post('/createFolder', verifyAuthorization, createFolderController);

// get content
contentRouter.post('/getContent', verifyAuthorization, getContentController);

// edit folder
contentRouter.put('/editFolder', verifyAuthorization, editFolderController);

// delete folder
contentRouter.post('/deleteFolder', verifyAuthorization, deleteFolderController);

export default contentRouter;