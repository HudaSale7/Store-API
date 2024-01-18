import { z } from "zod";

export const userSignupSchema = z.object({
    body: z.object({
      name: z.string({
        required_error: "Full name is required",
      }).min(3, {message: "name must be at least 3 characters long"}),
      password: z.string({
        required_error: "password is required",
      }).min(5, {message: "password must be at least 5 characters long"}),
      email: z.string({
          required_error: "Email is required",
        }).email("Not a valid email")
    }),
  });

  export const userLoginSchema = z.object({
    body: z.object({
      password: z.string({
        required_error: "password is required",
      }).min(5, {message: "password must be at least 5 characters long"}),
      email: z.string({
          required_error: "Email is required",
        }).email("Not a valid email"),
    }),
  });