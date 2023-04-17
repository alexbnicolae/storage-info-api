import { Request, Response } from 'express';
import { verifyAuthorization } from "../../utils/verifyAuthorization";
import { editUserService, getUserService } from '../../services/user/user.service';

export const getUserController = async (req: Request, res: Response) => {
    
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    let resProcessingData = await getUserService((isAuth.token as string))

    return res.json({data: resProcessingData})
}

export const editUserController = async (req: Request, res: Response) => {
    
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    let resProcessingData = await editUserService(req.body, (isAuth.token as string))

    return res.json({data: resProcessingData})
}