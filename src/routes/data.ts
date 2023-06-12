import { Router } from 'express';
import { verifyAuthorization } from '../utils/verifyAuthorization';
import { getDataController } from '../controllers/data/data.controller';

const dataRouter = Router();

// get all data paginated
dataRouter.post('/getData', verifyAuthorization, getDataController);


export default dataRouter;