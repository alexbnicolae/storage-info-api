import { Request, Response } from 'express';
import { createContentValidator, deleteContentValidator, editContentValidator } from '../../routes/validators/content.validators';
import { createFolderService, deleteFolderService, editFolderService, getContentService } from '../../services/content/content.service';
import { getToken } from '../../utils/getToken';


export const createFolderController = async (req: Request, res: Response) => {
    
    // verify if the user sent the data correctly
    const { error, value } = createContentValidator.validate(req.body);
    if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    
    // process data
    let resProcessingData = await createFolderService(req.body, (token as string));

    return res.json({data: resProcessingData})
}

export const getContentController = async (req: Request, res: Response) => {
    //getToken
    let token = await getToken(req);

    let resProcessingData = await getContentService(req.body.parentId, (token as string))

    return res.json({data: resProcessingData})
}

export const editFolderController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    const { error, value } = editContentValidator.validate(req.body);
    if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    
    let resProcessingData = await editFolderService(req.body, (token as string))

    return res.json({data: resProcessingData})
}

export const deleteFolderController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    const { error, value } = deleteContentValidator.validate(req.body);
    if(error) return res.json({data: 400});
    
    let resProcessingData = await deleteFolderService(req.body.id)

    return res.json({data: resProcessingData})
}

