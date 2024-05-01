import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required").trim(),
    email: z
      .string()
      .min(1, "E-mail is required.")
      .email("Please enter the valid e-mail address.")
      .trim(),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must have minimum 6 characters."),
    confirmPassword: z.string().min(1, "Password confirmation is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match.",
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
