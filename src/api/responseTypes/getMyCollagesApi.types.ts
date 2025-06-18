import { z } from "zod";

export const SingleCollageSchema = z
  .object({
    collageId: z.number(),
    collageImageUrl: z.string().nullable(),
    channelDetails: z.array(
      z.object({
        channeId: z.number(),
        channelName: z.string(),
        channelLogo: z.string(),
      }),
    ),
    tickerOcrResults: z.array(z.string()),
    createdAt: z.string(),
    creator: z.object({
      creatorId: z.number(),
      creatorName: z.string(),
      creatorProfilePic: z.string().nullable(),
      creatorEmail: z.string().email("not a valid email address."),
    }),
    collageName: z.string(),
    collageImageName: z.string().optional(),
    temaDetails: z.array(
      z.object({
        teamId: z.number(),
        teamName: z.string(),
      }),
    ),
  })
  .strict();

export type SingleCollageType = z.infer<typeof SingleCollageSchema>;

export const GetAllCollagesSchema = z
  .object({
    results: z.array(SingleCollageSchema),
    pagination_data: z.object({
      count: z.number(),
      next: z.string().nullable(),
      previous: z.number().nullable(),
      page_size: z.number(),
      current_page: z.number(),
      total_pages: z.number(),
    }),
  })
  .strict();

export type GetAllCollagesResponseType = z.infer<typeof GetAllCollagesSchema>;
