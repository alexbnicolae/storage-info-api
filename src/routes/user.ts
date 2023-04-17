import { Router } from 'express';
import { editUserController, getUserController } from '../controllers/user/user.controller';

const userRouter = Router();

// get file
userRouter.get('/getUser', getUserController);

// update user
userRouter.put('/editUser', editUserController)

export default userRouter;