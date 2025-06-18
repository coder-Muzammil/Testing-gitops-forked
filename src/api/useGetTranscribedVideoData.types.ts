import { z } from "zod";

export const TranscriptionSchema = z.object({
  id: z.number(),
  originalText: z.string(),
  startTime: z.number(),
  editedText: z.string(),
  endTime: z.number(),
  speakerName: z.string(),
});

export type TranscriptionType = z.infer<typeof TranscriptionSchema>;

export const GetTranscribedVideoDataApiResponseSchema = z.object({
  video: z.object({
    Name: z.string(),
    id: z.number().optional(),
    file: z.string(),
  }),
  chunks: z.array(TranscriptionSchema),
});

export type GetTranscribedVideoDataApiResponseType = z.infer<
  typeof GetTranscribedVideoDataApiResponseSchema
>;
