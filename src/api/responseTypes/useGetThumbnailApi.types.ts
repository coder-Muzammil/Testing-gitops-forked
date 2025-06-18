import { z } from "zod";


export const StreamIntervalSchema = z.object({
  startTime: z.number(),
  endTime: z.number(),
});

export type StreamIntervalType = z.infer<typeof StreamIntervalSchema>;

export const GetThumbnailResponseSchema = z.object({
  intervals: z.array(StreamIntervalSchema),
  liveLink: z.string(),
});

export type GetThumbnailResponseType = z.infer<typeof GetThumbnailResponseSchema>;
