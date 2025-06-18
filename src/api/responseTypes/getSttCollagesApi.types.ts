import { z } from "zod";
export const descriptionSchema = z.object({
  topic_urdu: z.union([z.string(), z.null()]).nullable(),
  summary_urdu: z.union([z.string(), z.null()]).nullable(),
  topic_english: z.union([z.string(), z.null()]).nullable(),
  summary_english: z.union([z.string(), z.null()]).nullable(),
});
export type descriptionType = z.infer<typeof descriptionSchema>;
export const SingleSttCollageSchema = z
  .object({
    id: z.number(),
    transcriptionImageName: z.string(),
    transcriptionName: z.string().nullable(),
    transcriptions: z.array(z.number()),
    transcriptionMedia: z.string(),
    uploadedAt: z.string(),
    username: z.string(),
    count: z.string(),
    teams: z.array(z.number()).optional(),
    description: z.array(descriptionSchema),
    poster: z.string().nullable().optional(),
    source: z.union([
      z.literal("stt"),
      z.literal("topics"),
      z.literal("sttUploads"),
    ]),
  })
  .strict();

export type SingleSttCollageType = z.infer<typeof SingleSttCollageSchema>;

export const GetAllSttCollagesSchema = z
  .object({
    results: z.array(SingleSttCollageSchema),
    pagination_data: z.object({
      count: z.number(),
      next: z.string().nullable(),
      previous: z.number().nullable(),
      page_size: z.number(),
      current_page: z.number(),
      total_pages: z.number(),
    }),
  })
  .strict();

export type GetAllSttCollagesResponseType = z.infer<
  typeof GetAllSttCollagesSchema
>;
