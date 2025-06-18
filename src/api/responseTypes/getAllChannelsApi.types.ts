import { z } from "zod";

export const SingleChannelSchema = z
  .object({
    id: z.number(),
    logo: z.string().nullable(),
    poster: z.string().nullable(),
    playbackLink: z.string(),
    playbackDates: z.object({
      startDate: z.string().nullable(),
      excludedDates: z.array(z.string()),
      endDate: z.string().nullable(),
    }),
    name: z.string(),
    process_id: z.string().nullable(),
    subprocess_id: z.string().nullable(),
    stream_source: z.string(),
    isLive: z.boolean(),
    liveLink: z.string(),
    channel_type: z.string(),
    isTickerActivated: z.boolean(),
    isSTTActivated: z.boolean(),
    isFRActivated: z.boolean(),
    isFlasherActivated: z.boolean(),
    isWordCloudActivated: z.boolean(),
    playlists: z.array(z.number()),
  })
  .strict();

export type SingleChannelType = z.infer<typeof SingleChannelSchema>;

export const GetAllChannelsApiResponseSchema = z.array(SingleChannelSchema);

export type GetAllChannelsApiResponseType = z.infer<
  typeof GetAllChannelsApiResponseSchema
>;
