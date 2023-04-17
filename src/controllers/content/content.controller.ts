import { Request, Response } from 'express';
import { verifyAuthorization } from '../../utils/verifyAuthorization';
import { createContentValidator, deleteContentValidator, editContentValidator } from '../../routes/validators/content.validators';
import { createFolderService, deleteFolderService, editFolderService, getContentService } from '../../services/content/content.service';


export const createFolderController = async (req: Request, res: Response) => {
    // debugger;
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // verify if the user sent the data correctly
    const { error, value } = createContentValidator.validate(req.body);
    if(error) return res.json({data: 400});
    
    // process data
    let resProcessingData = await createFolderService(req.body, (isAuth.token as string));

    return res.json({data: resProcessingData})
}

export const getContentController = async (req: Request, res: Response) => {

    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});
    
    let resProcessingData = await getContentService(req.body.parentId, (isAuth.token as string))

    return res.json({data: resProcessingData})
}

export const editFolderController = async (req: Request, res: Response) => {
    
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // verify if the user sent the data correctly
    const { error, value } = editContentValidator.validate(req.body);
    if(error) return res.json({data: 400});
    
    let resProcessingData = await editFolderService(req.body, (isAuth.token as string))

    return res.json({data: resProcessingData})
}

export const deleteFolderController = async (req: Request, res: Response) => {
    
    // verify if the user is authorized
    const isAuth = await verifyAuthorization(req);
    if(isAuth.code !== 200) return res.json({data: 401});

    // verify if the user sent the data correctly
    const { error, value } = deleteContentValidator.validate(req.body);
    if(error) return res.json({data: 400});
    
    let resProcessingData = await deleteFolderService(req.body.id)

    return res.json({data: resProcessingData})
}

