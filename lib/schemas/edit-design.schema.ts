import { z } from "zod";

export const EditDesignSchema = z.object({
  title: z.string().min(1, "Title is required.").max(20, "Title can be maximum of 20 characters long.").trim(),
  description: z.string().max(100, "Description can be maximum of 100 characters long.").trim().optional(),
});

export type EditDesignSchemaType = z.infer<typeof EditDesignSchema>;
