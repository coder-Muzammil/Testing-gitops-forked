import { z } from "zod";
export const translateTickerSchema = z.object({
  recordId: z.number(),
  createdAt: z.string(),
  tickerImageUrl: z.string(),
  channel: z.object({
    channelId: z.number(),
    channelName: z.string(),
    channelLogo: z.string().nullable(),
  }),
  ocrResult: z.string(),
  dateTime: z.string(),
});

export const getAllTickersTranslateData = z.array(translateTickerSchema);

export type GetAllTickersTranslateResponseType = z.infer<
  typeof getAllTickersTranslateData
>;
