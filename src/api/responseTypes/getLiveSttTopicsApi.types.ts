import { z } from "zod";
import { PaginationDataSchema } from "./getFlashersApi.types";

export const SingleTopicSchema = z
  .object({
    topicRecordId: z.number(),
    channelName: z.string(),
    channelLogo: z.string(),
    startSeconds: z.number(),
    // endSeconds: z.number(),
    createdAt: z.string().datetime({
      offset: true,
    }),
    topicUrdu: z.string(),
    topicEnglish: z.string(),
    summaryUrdu: z.string(),
    summaryEnglish: z.string(),
  })
  .strict();

export type SingleTopicType = z.infer<typeof SingleTopicSchema>;

export const GetLiveSttTopicsPaginatedDataSchema = z
  .object({
    results: z.array(SingleTopicSchema),
    pagination_data: PaginationDataSchema,
  })
  .strict();

export type GetLiveSttTopicsResponseType = z.infer<
  typeof GetLiveSttTopicsPaginatedDataSchema
>;
