import { Request } from "express";

export const getToken = async (req: Request) => {
    const token = req?.headers?.authorization?.split(' ')[1];

    return token;
}