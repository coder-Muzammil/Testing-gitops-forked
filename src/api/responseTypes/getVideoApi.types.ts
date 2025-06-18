import { z } from "zod";

export const GetVideoSchema = z.object({
  videoName: z.string(),
});

export type GetVideoResponseType = z.infer<typeof GetVideoSchema>;
