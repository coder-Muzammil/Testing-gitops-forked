import { z } from "zod";

export const GetStarPlaySchema = z.object({
  success: z.boolean(),
  link: z.string().url(),
  startTime: z.number().optional(),
});

export type GetStarPlayResponse = z.infer<typeof GetStarPlaySchema>;
