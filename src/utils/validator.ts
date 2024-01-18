import { AnyZodObject } from "zod";
import { Request } from "express";

// this function will validate input against schema, if failed it will throw an error
export const validator = (req: Request, schema: AnyZodObject) => {
    schema.parse({body: req.body});
}
     