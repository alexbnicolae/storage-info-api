import { Router } from 'express';
import { verifyAuthorization } from '../utils/verifyAuthorization';
import { deleteDataController, editDataController, getDataController } from '../controllers/data/data.controller';

const dataRouter = Router();

// get all data paginated
dataRouter.post('/getData', verifyAuthorization, getDataController);

// edit data
dataRouter.post('/editData', verifyAuthorization, editDataController)

// delete data
dataRouter.post('/deleteData', verifyAuthorization, deleteDataController)

export default dataRouter;