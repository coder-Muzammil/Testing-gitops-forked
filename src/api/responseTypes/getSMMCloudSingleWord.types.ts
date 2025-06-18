import { z } from "zod";

export const wordDetailSchema = z.object({
  id: z.number(),
  channelName: z.string(),
  channelImage: z.string(),
  tickerImage: z.string(),
  ocrResult: z.string(),
  createdAt: z.string(),
  dateTime: z.string(),
});
export type WordDetailType = z.infer<typeof wordDetailSchema>;

export const singleWordApiResponseSchema = z.object({
  results: z.array(wordDetailSchema),
});
export type SingleWordApiResponseType = z.infer<
  typeof singleWordApiResponseSchema
>;
