import { Router } from 'express';
import { createWordFileController, deleteWordFileController, editWordFileController, getWordFileController } from '../controllers/wordfile/wordfile.controller';

const wordfileRouter = Router();

// create file
wordfileRouter.post('/createWordFile', createWordFileController);

// get file
wordfileRouter.post('/getContent', getWordFileController);

// edit file
wordfileRouter.put('/editWordfile', editWordFileController);

//delete file
wordfileRouter.post('/deleteWordfile', deleteWordFileController);

export default wordfileRouter;