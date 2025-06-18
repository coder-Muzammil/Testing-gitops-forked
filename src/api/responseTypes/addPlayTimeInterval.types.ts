import { z } from "zod";

export const AddPlayTimeIntervalSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  channelName: z.string(),
  date: z.string().nullable(),
});

export type AddPlayTimeIntervalPayloadType = z.infer<
  typeof AddPlayTimeIntervalSchema
>;

export const AddPlayTimeIntervalApiResponseSchema = z.object({
  start_seconds: z.number(),
  end_seconds: z.number(),
  file_name: z.string(),
});


export type AddPlayTimeIntervalApiResponseType = z.infer<
  typeof AddPlayTimeIntervalApiResponseSchema
>;