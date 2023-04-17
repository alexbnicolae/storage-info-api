import { Request, Response } from 'express';
import { verifyAuthorization } from "../../utils/verifyAuthorization";
import { createWordFileValidator, deleteWordFileValidator, editWordFileValidator } from '../../routes/validators/wordfile.validators';
import { createWordFileService, deleteWordFileService, editWordFileService, getWordFileService } from '../../services/wordfile/wordfile.service';

export const createWordFileController = async (req: Request, res: Response) => {
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // verify if the user sent the data correctly
    const { error, value } = createWordFileValidator.validate(req.body);
    if(error) return res.json({data: 400});
    
    // process data
    let resProcessingData = await createWordFileService(req.body, (isAuth.token as string));

    return res.json({data: resProcessingData})
}

export const getWordFileController = async (req: Request, res: Response) => {
    // debugger;
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    
    let resProcessingData = await getWordFileService(req.body.parentId, (isAuth.token as string))

    return res.json({data: resProcessingData})
}

export const editWordFileController = async (req: Request, res: Response) => {
    // debugger;
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // verify if the user sent the data correctly
    const { error, value } = editWordFileValidator.validate(req.body);
    if(error) return res.json({data: 400});
    
    let resProcessingData = await editWordFileService(req.body, (isAuth.token as string))

    return res.json({data: resProcessingData})
}

export const deleteWordFileController = async (req: Request, res: Response) => {
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // verify if the user sent the data correctly
    const { error, value } = deleteWordFileValidator.validate(req.body);
    if(error) return res.json({data: 400});

    let resProcessingData = await deleteWordFileService(req.body.id)

    return res.json({data: resProcessingData})
}

