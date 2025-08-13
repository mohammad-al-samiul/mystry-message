import z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .regex(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Email format is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
