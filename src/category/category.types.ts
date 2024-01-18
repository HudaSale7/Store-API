import { z } from "zod";

export const createCategoryScheme = z.object({
    body: z.object({
      name: z.string({
        required_error: "Category name is required",
      }).min(3, {message: "Category name must be at least 2 characters long"}),
    })
  });