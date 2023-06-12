import { createNoteService, deleteNoteFileService, editNoteService, getNoteService, getNotesService } from "../../services/note/note.service";
import { getToken } from "../../utils/getToken";
import { Request, Response } from 'express';

export const createNoteController = async (req: Request, res: Response) => {
    
    // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);

    // process data
    let resProcessingData = await createNoteService(req.body, (token as string));

    return res.json({data: resProcessingData})
}

export const getNotesController = async (req: Request, res: Response) => {
    //getToken
    let token = await getToken(req);

    let resProcessingData = await getNotesService(req.body.parentId, (token as string))

    return res.json({data: resProcessingData})
}

export const getNoteController = async (req: Request, res: Response) => {

    let resProcessingData = await getNoteService(req.body.id)

    return res.json({data: resProcessingData})
}

export const ediNoteController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    // const { error, value } = editWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    
    let resProcessingData = await editNoteService(req.body, (token as string))

    return res.json({data: resProcessingData})
}

export const deleteNoteFileController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    // const { error, value } = deleteWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    let resProcessingData = await deleteNoteFileService(req.body.id)

    return res.json({data: resProcessingData})
}
