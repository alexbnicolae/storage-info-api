import { Router } from 'express';
import { createFolderController, getContentController } from '../controllers/content/content.controller';

const contentRouter = Router();

// create folder
contentRouter.post('/createFolder', createFolderController);

// get content
contentRouter.post('/getContent', getContentController);

export default contentRouter;