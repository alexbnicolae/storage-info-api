import { deleteDataService, editDataService, getDataService } from "../../services/data/data.service";
import { getToken } from "../../utils/getToken";
import { Request, Response } from 'express';

export const getDataController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    
    let resProcessingData = await getDataService(req.body, (token as string))

    return res.json({data: resProcessingData})
}

export const editDataController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    
    let resProcessingData = await editDataService(req.body, (token as string))

    return res.json({data: resProcessingData})
}

export const deleteDataController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);

    let resProcessingData = await deleteDataService(req.body, (token as string))

    return res.json({data: resProcessingData})
}