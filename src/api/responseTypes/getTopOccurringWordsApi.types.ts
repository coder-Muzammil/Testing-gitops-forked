import { z } from "zod";

export const SingleWordSchema = z.object({
  word: z.string(),
  count: z.number(),
  percentileValue: z.number(),
});

export type SingleWordType = z.infer<typeof SingleWordSchema>;

export const GetTopOccurringWordsApiResponseSchema = z.array(SingleWordSchema);

export type GetTopOccurringWordsApiResponseType = z.infer<
  typeof GetTopOccurringWordsApiResponseSchema
>;
