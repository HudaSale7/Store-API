import { z } from "zod";

export interface Product {
  name: string,
  price: number,
  description: string,
}

export const productScheme = z.object({
    body: z.object({
      name: z.string({
        required_error: "Product name is required",
      }).min(2, {message: "Product name must be at least 2 characters long"}),
      price: z.number({
        required_error: "Product name is required",
      }),
      description: z.string({
        required_error: "Product description is required",
      }).min(4, {message: "Product description must be at least 4 characters long"}),
    })
});

