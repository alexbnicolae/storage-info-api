import { Router } from 'express';
import { createWordFileController, deleteWordFileController, editWordFileController, getWordFileController } from '../controllers/wordfile/wordfile.controller';
import { verifyAuthorization } from '../utils/verifyAuthorization';

const wordfileRouter = Router();

// create file
wordfileRouter.post('/createWordFile', verifyAuthorization, createWordFileController);

// get file
wordfileRouter.post('/getContent', verifyAuthorization, getWordFileController);

// edit file
wordfileRouter.put('/editWordfile', verifyAuthorization, editWordFileController);

//delete file
wordfileRouter.post('/deleteWordfile', verifyAuthorization, deleteWordFileController);

export default wordfileRouter;