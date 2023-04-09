import { Request } from "express";
import { httpInterceptor } from "./httpInterceptor";

export const verifyAuthorization = async (req: Request) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    let code = await httpInterceptor(token);

    if(code == 401){
        let res = { code: 401, token: null }
        return res;
    }
    else {
        let res = { code: 200, token: token } 
        return res;
    }
}