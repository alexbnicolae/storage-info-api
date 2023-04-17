import { Router } from 'express';
import { createFolderController, deleteFolderController, editFolderController, getContentController } from '../controllers/content/content.controller';

const contentRouter = Router();

// create folder
contentRouter.post('/createFolder', createFolderController);

// get content
contentRouter.post('/getContent', getContentController);

// edit folder
contentRouter.put('/editFolder', editFolderController);

// delete folder
contentRouter.post('/deleteFolder', deleteFolderController);

export default contentRouter;