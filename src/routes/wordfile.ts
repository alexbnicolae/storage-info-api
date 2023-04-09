import { Router } from 'express';
import { createWordFileController, getWordFileController } from '../controllers/wordfile/wordfile.controller';

const wordfileRouter = Router();

// create file
wordfileRouter.post('/createWordFile', createWordFileController);

// get file
wordfileRouter.post('/getContent', getWordFileController);

export default wordfileRouter;