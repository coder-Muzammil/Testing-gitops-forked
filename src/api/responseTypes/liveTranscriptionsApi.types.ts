import { z } from "zod";
import { PaginationDataSchema } from "./getFlashersApi.types";

export const SingleTranscriptionSchema = z
  .object({
    channelLogo: z.string(),
    channelName: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    speakerName: z.string().nullable(),
    startTime: z.number(),
    transcription: z.string(),
    transcriptionId: z.number(),
    mediaChunk: z.string().optional(),
  })
  .strict();

export type SingleTranscriptionType = z.infer<typeof SingleTranscriptionSchema>;

export const GetLiveTranscriptionsPaginatedDataSchema = z
  .object({
    results: z.array(SingleTranscriptionSchema),
    pagination_data: PaginationDataSchema,
  })
  .strict();

export type GetLiveTranscriptionsPaginatedDataType = z.infer<
  typeof GetLiveTranscriptionsPaginatedDataSchema
>;
