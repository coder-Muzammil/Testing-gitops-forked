import { z } from "zod";

export const KeywordSchema = z.object({
  text: z.string(),
  value: z.number(),
  count: z.number(),
});
export type KeywordType = z.infer<typeof KeywordSchema>;

export const SMMCloudApiResponseSchema = z.object({
  results: z.array(KeywordSchema),
});
export type SMMCloudApiResponseType = z.infer<typeof SMMCloudApiResponseSchema>;

