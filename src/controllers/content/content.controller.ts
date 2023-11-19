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
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    if((req.headers["platform"] as string)?.toLowerCase()?.includes("mobile"))
        isMobile = true;
    // process data
    let resProcessingData = await createFolderService(req.body, (token as string), isMobile);

    return res.json({data: resProcessingData})
}

export const getContentController = async (req: Request, res: Response) => {
    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    if((req.headers["platform"] as string)?.toLowerCase()?.includes("mobile"))
        isMobile = true;

    let resProcessingData = await getContentService(req.body.parentId, (token as string), isMobile)

    return res.json({data: resProcessingData})
}

export const editFolderController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    const { error, value } = editContentValidator.validate(req.body);
    if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    if((req.headers["platform"] as string)?.toLowerCase()?.includes("mobile"))
        isMobile = true;
    
    let resProcessingData = await editFolderService(req.body, (token as string), isMobile)

    return res.json({data: resProcessingData})
}

export const deleteFolderController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    const { error, value } = deleteContentValidator.validate(req.body);
    if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    if((req.headers["platform"] as string)?.toLowerCase()?.includes("mobile"))
        isMobile = true;
    
    let resProcessingData = await deleteFolderService(req.body.id, (token as string), isMobile)

    return res.json({data: resProcessingData})
}

