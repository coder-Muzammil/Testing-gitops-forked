import { z } from "zod";
export const SingleThumbnailParamsSchema = z.object({
  persons: z.union([z.string(), z.null()]),
  channels: z.union([z.string(), z.null()]),
  startDate: z.union([z.string(), z.null()]),
  endDate: z.union([z.string(), z.null()]),
  startTime: z.union([z.string(), z.null()]),
  endTime: z.union([z.string(), z.null()]),
  identity: z.union([z.string(), z.null()]),
});
export type SingleThumbnailParamsType = z.infer<
  typeof SingleThumbnailParamsSchema
>;

// Define the schema for the 'channel' object
// const ChannelSchema = z.object({
//   channelName: z.string(),
//   channelLogo: z.string(),
// });

// Define the schema for the 'coverageData' array items
// const CoverageDataSchema = z.object({
//   coverageId: z.number(),
//   screenTime: z.number(),
//   clipId: z.number(),
//   personName: z.string(),
//   startAppearanceInThisChunk: z.string(),
//   endAppearanceInThisChunk: z.string(),
//   seekTime: z.number(),
//   ChannelNames: ChannelSchema,
// });

// Define the schema for the 'results' array items
export const ResultsSchema = z.object({
  person_id: z.number(),
  person_name: z.string(),
  person_thumbnail: z.string(),
  channel_logo: z.string(),
  channel_name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  total_seconds: z.number(),
});

export type GetThumbnailResponseType = z.infer<typeof ResultsSchema>;

// Define the schema for 'paginationData'
const PaginationDataSchema = z.object({
  count: z.number(),
  pageSize: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  next: z.string().nullable(), // 'next' can be null
  previous: z.string().nullable(), // 'previous' can be null
});

// Define the schema for the main object
export const GetAllThumbnailsResponseSchema = z.object({
  results: z.array(ResultsSchema),
  paginationData: PaginationDataSchema,
});
// export const GetAllThumbnailsResponseSchema = z.object({
//   results: z.array(ResultsSchema),
//   count: z.number(),
//   next: z.string().nullable(),
//   previous: z.string().nullable(),
// });

export type GetAllThumbnailsResponseType = z.infer<
  typeof GetAllThumbnailsResponseSchema
>;
