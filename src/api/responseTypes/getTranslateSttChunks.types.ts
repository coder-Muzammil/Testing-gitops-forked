import { z } from "zod";

export const TranslateSttChunksApiResponseSchema = z.array(
  z.object({
    id: z.number(),
    translated_text: z.string(),
  }),
);
export type TranslateSttChunksApiResponse = z.infer<
  typeof TranslateSttChunksApiResponseSchema
>;
