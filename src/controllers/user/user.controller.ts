import { Request, Response } from 'express';
import { editUserService, getUserService } from '../../services/user/user.service';
import { getToken } from '../../utils/getToken';

export const getUserController = async (req: Request, res: Response) => {

    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");

    let resProcessingData = await getUserService((token as string), isMobile)

    return res.json({data: resProcessingData})
}

export const editUserController = async (req: Request, res: Response) => {

    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");

    let resProcessingData = await editUserService(req.body, (token as string), isMobile)

    return res.json({data: resProcessingData})
}