import { Request, Response } from 'express';
import { verifyAuthorization } from "../../utils/verifyAuthorization";
import { createWordFileValidator, deleteWordFileValidator, editWordFileValidator } from '../../routes/validators/wordfile.validators';
import { createWordFileService, deleteWordFileService, editWordFileService, getWordFileService } from '../../services/wordfile/wordfile.service';
import { getToken } from '../../utils/getToken';

export const createWordFileController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    const { error, value } = createWordFileValidator.validate(req.body);
    if(error) return res.json({data: 400});
    
    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    // process data
    let resProcessingData = await createWordFileService(req.body, (token as string), isMobile);

    return res.json({data: resProcessingData})
}

export const getWordFileController = async (req: Request, res: Response) => {
    
    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");

    let resProcessingData = await getWordFileService(req.body.parentId, (token as string), isMobile)

    return res.json({data: resProcessingData})
}

export const editWordFileController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    const { error, value } = editWordFileValidator.validate(req.body);
    if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    
    let resProcessingData = await editWordFileService(req.body, (token as string), isMobile)

    return res.json({data: resProcessingData})
}

export const deleteWordFileController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    const { error, value } = deleteWordFileValidator.validate(req.body);
    if(error) return res.json({data: 400});

    let resProcessingData = await deleteWordFileService(req.body.id)

    return res.json({data: resProcessingData})
}

