import { z } from "zod";

// Define the schema for the individual objects in the "objects" array
const objectSchema = z.object({
  id: z.number(),
  text_ocr: z.string(),
  channel_name: z.string(),
  date: z.string(),
  time: z.string(),
});

// Define the schema for the items in the "keywords_cloud_offline" array
const keywordSchema = z.object({
  text: z.string(),
  value: z.number(),
  objects: z.array(objectSchema),
});

// Define the main schema for the API response
export const getWordsCloudDataSchema = z.object({
  trending_word_list: z.array(keywordSchema),
});

// Infer the TypeScript type from the Zod schema
export type KeywordsCloudOfflineResponseType = z.infer<
  typeof getWordsCloudDataSchema
>;
