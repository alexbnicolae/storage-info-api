import { Router } from 'express';
import { editUserController, getUserController } from '../controllers/user/user.controller';
import { verifyAuthorization } from '../utils/verifyAuthorization';

const userRouter = Router();

// get file
userRouter.get('/getUser', verifyAuthorization, getUserController);

// update user
userRouter.put('/editUser', verifyAuthorization, editUserController)

export default userRouter;