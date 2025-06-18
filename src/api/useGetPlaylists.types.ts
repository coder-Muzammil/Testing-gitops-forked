import { z } from "zod";
import { SingleChannelSchema } from "./responseTypes/getAllChannelsApi.types";

export const SinglePlaylistRecordSchema = z.object({
  id: z.number(),
  playlistName: z.string(),
  user: z.number(),
  channels: z.array(SingleChannelSchema),
});

export type SinglePlaylistRecordType = z.infer<
  typeof SinglePlaylistRecordSchema
>;

export const GetPlaylistsResponseSchema = z.array(SinglePlaylistRecordSchema);

export type GetPlaylistsResponseType = z.infer<
  typeof GetPlaylistsResponseSchema
>;
