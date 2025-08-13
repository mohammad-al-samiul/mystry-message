import z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid Email")
    .regex(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter your valid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});
