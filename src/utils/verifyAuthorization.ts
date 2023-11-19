import { Request, Response, NextFunction } from "express";
import { httpInterceptor } from "./httpInterceptor";

export const verifyAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];

    let isMobile = (req.headers["user-agent"] as string).toLowerCase().includes("mobile");
    if((req.headers["platform"] as string)?.toLowerCase()?.includes("mobile"))
        isMobile = true;

    let code = await httpInterceptor(token, isMobile);

    if(code == 401){
        return res.json({data: 401});
    }
     
    next();
    
}