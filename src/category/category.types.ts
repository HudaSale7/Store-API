import { z } from "zod";

export const categoryScheme = z.object({
    body: z.object({
      name: z.string({
        required_error: "Category name is required",
      }).min(2, {message: "Category name must be at least 2 characters long"}),
    })
});