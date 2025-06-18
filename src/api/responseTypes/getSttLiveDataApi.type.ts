import { z } from "zod";
import { SingleTranscriptionSchema } from "./liveTranscriptionsApi.types";

// Define the schema for the individual objects in the "objects" array

export const TopicDataSchema = z
  .object({
    topic: z.string(),
    summary: z.string(),
  })
  .strict();

export type TopicDataType = z.infer<typeof TopicDataSchema>;

export const ThreeMinuteTopicDataSchema = z
  .object({
    topicRecordId: z.number(),
    startSeconds: z.number(),
    endSeconds: z.number(),
    createdAtTopic: z.string().datetime(),
    topicData: z.object({
      english: z.array(TopicDataSchema),
      urdu: z.array(TopicDataSchema),
    }),
  })
  .strict();

export type ThreeMinuteTopicDataType = z.infer<
  typeof ThreeMinuteTopicDataSchema
>;

export const getSttLiveDataResponseSchema = z
  .object({
    channelName: z.string(),
    sttData: z.array(SingleTranscriptionSchema),
    topicgenerationdata: z.array(ThreeMinuteTopicDataSchema),
  })
  .strict();

export type getSttLiveDataResponseType = z.infer<
  typeof getSttLiveDataResponseSchema
>;
