import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";


export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let message  = "";
    let statusCode = 500;
    const somethingWrong = "Something Went Wrong Please Try Again Later";

    if(error instanceof ZodError) {
      message = JSON.parse(error.message)[0].message;
      statusCode = 422;
    }
    else if(error instanceof Prisma.PrismaClientKnownRequestError) {
      message = "Invalid Data";
      statusCode = 422;
    }
    else {
      message = error.message?? somethingWrong;
      statusCode = error.status?? 500;
    }
    res.status(statusCode).json({ message: message });
}