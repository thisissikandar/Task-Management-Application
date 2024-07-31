import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "FullName Must be at least 2 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
