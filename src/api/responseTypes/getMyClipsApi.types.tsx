import { z } from "zod";

export const SingleClipSchema = z
  .object({
    clipFileUrl: z.string(),
    clipId: z.number(),
    clipPosterUrl: z.string().nullable(),
    comment: z.string(),
    createdAt: z.string(),
    description: z.string(),
    tags: z.string().nullable(),
    title: z.string(),
    channelName: z.string(),
  })
  .strict();

export type SingleClipType = z.infer<typeof SingleClipSchema>;

export const MyClipsApiResponseSchema = z.object({
  results: z.array(SingleClipSchema),
  pagination_data: z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.number().nullable(),
    page_size: z.number(),
    current_page: z.number(),
    total_pages: z.number(),
  }),
});

export type MyClipsApiResponseType = z.infer<typeof MyClipsApiResponseSchema>;
