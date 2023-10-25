import { Request, Response, NextFunction } from "express";
import { httpInterceptor } from "./httpInterceptor";

export const verifyAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    let code = await httpInterceptor(token);

    if(code == 401){
        return res.json({data: 401});
    }
    
    next();
    
}