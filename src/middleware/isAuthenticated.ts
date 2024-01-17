import { NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { errorFactory } from "../utils/errorFactory";
import "dotenv/config";

export const isAuthenticated = (req: any, res: any, next: NextFunction) => {
 try {
    const token = req.headers.token;
    if(!token) throw errorFactory('Not authenticated', 422);

    const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY as string);
    if(!decodedToken.userId) throw errorFactory('Not authenticated', 422);

    req.userId = decodedToken.userId;
    next();

 } catch(error) {
    next(error);
 }
}