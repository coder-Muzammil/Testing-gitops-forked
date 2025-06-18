import { z } from "zod";

export const SingleMosaicSchema = z.object({
  mosaicId: z.number(),
  mosaicImageUrl: z.string(),
  mosaicOcrResults: z.array(z.string()),
  channelDetails: z.array(
    z.object({
      channelId: z.number(),
      channelName: z.string(),
      channelLogo: z.string(),
    }),
  ),

  createdAt: z.string(),
  creator: z.object({
    creatorId: z.number(),
    creatorName: z.string(),
    creatorProfilePic: z.string().nullable(),
    creatorEmail: z.string().email("not a valid email address."),
  }),
  mosaicName: z.string(),
  teamDetails: z.array(
    z.object({
      teamId: z.number(),
      teamName: z.string(),
    }),
  ),
  mosaicImageName: z.string(),
});

export type SingleMosaicType = z.infer<typeof SingleMosaicSchema>;

export const GetAllMosaicsSchema = z.object({
  results: z.array(SingleMosaicSchema),
  pagination_data: z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.number().nullable(),
    page_size: z.number(),
    current_page: z.number(),
    total_pages: z.number(),
  }),
});

export type GetAllMosaicsResponseType = z.infer<typeof GetAllMosaicsSchema>;
