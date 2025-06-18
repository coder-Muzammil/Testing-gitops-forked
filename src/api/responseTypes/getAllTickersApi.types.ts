import { z } from "zod";
import { PaginationDataSchema } from "./getFlashersApi.types";

export const GetAllTickersSchema = z
  .object({
    recordId: z.number(),
    createdAt: z.string(),
    tickerImageUrl: z.string(),
    tickerImageName: z.string(),
    channel: z.object({
      channelId: z.number(),
      channelName: z.string(),
      channelLogo: z.string().nullable(),
      channelLogoName: z.string(),
    }),
    ocrResult: z.string(),
    dateTime: z.string(),
  })
  .strict();

export type SingleTickerType = z.infer<typeof GetAllTickersSchema>;

export const GetAllTickersApiResponseSchema = z.object({
  results: z.array(GetAllTickersSchema),
  pagination_data: PaginationDataSchema,
});

export type GetAllTickersResponseType = z.infer<
  typeof GetAllTickersApiResponseSchema
>;
