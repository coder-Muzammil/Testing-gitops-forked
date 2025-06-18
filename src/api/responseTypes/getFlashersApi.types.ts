import { z } from "zod";

export const GetAllFlashersSchema = z
  .object({
    recordId: z.number(),
    createdAt: z.string(),
    flasherImageUrl: z.string(),
    flasherFullFrameImageUrl: z.string(),
    fullFrameFlasherImageName: z.string(),
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

export type SingleFlasherType = z.infer<typeof GetAllFlashersSchema>;

export const PaginationDataSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.number().nullable(),
  page_size: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
});

export const GetAllFlashersApiResponseSchema = z.object({
  results: z.array(GetAllFlashersSchema),
  pagination_data: PaginationDataSchema,
});

export type GetAllFlashersResponseType = z.infer<
  typeof GetAllFlashersApiResponseSchema
>;
