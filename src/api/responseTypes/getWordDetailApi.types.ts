// import { z } from "zod";

// export const SingeWordDetailSchema = z
//   .object({
//     channelName: z.string(),
//     dateTime: z.string().datetime(),
//     id: z.number(),
//     text: z.string(),
//   })
//   .strict();

// export type SingleWordDetailType = z.infer<typeof SingeWordDetailSchema>;

// export const WordDetailApiResponseSchema = z.array(SingeWordDetailSchema);

// export type WordDetailApiResponseType = z.infer<
//   typeof WordDetailApiResponseSchema
// >;

import { z } from "zod";

export const singeWordDetailSchema = z.object({
  channelName: z.string(),
  channelLogo: z.string(),
  module: z.string(),
  count: z.number(),
});
export type SingeWordDetailType = z.infer<typeof singeWordDetailSchema>;

export const wordDetailApiResponseSchema = z.object({
  flasher: z.array(singeWordDetailSchema),
  ticker: z.array(singeWordDetailSchema),
  topic_english: z.array(singeWordDetailSchema),
  topic_urdu: z.array(singeWordDetailSchema),
  overall_count: z.array(
    z.object({
      channelName: z.string(),
      channelLogo: z.string(),
      count: z.number(),
    }),
  ),
});

export type WordDetailApiResponseType = z.infer<
  typeof wordDetailApiResponseSchema
>;
