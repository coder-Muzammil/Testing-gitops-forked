import { z } from "zod";

export const transcribeVideoApiResponseSchema = z.object({
  id: z.number(),
});

export type transcribeVideoApiResponseType = z.infer<
  typeof transcribeVideoApiResponseSchema
>;
