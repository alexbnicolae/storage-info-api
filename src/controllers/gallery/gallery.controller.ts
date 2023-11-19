import { Request, Response } from "express";
import { createGalleryService, deleteGalleryService } from "../../services/gallery/gallery.service";
import { getToken } from "../../utils/getToken";

export const createGalleryController = async (req: Request, res: Response) => {
    
    // verify if the user sent the data correctly
    // const { error, value } = createContentValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    //getToken
    let token = await getToken(req);
    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    if((req.headers["platform"] as string).toLowerCase().includes("mobile"))
        isMobile = true;
    // process data
    let resProcessingData = await createGalleryService(req, (token as string), isMobile);

    return res.json({data: resProcessingData})
}

export const deleteGalleryController = async (req: Request, res: Response) => {

    // verify if the user sent the data correctly
    // const { error, value } = deleteWordFileValidator.validate(req.body);
    // if(error) return res.json({data: 400});

    let resProcessingData = await deleteGalleryService(req.body.id)

    return res.json({data: resProcessingData})
}
