import { AnyZodObject } from "zod";
import { Request } from "express";

export const validator = (req: Request, schema: AnyZodObject) => {
    schema.parse({body: req.body});
}
     