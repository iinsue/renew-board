import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({
    message: "Email is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is reqired",
  }),
});
