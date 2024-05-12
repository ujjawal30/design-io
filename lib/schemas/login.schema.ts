import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail is required.")
    .email("Please enter the valid e-mail address.")
    .trim(),
  password: z.string().min(1, "Password is required."),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
