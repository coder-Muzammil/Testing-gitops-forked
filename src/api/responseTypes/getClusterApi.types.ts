import { z } from "zod";

export const GetClusterSchema = z.array(
  z.object({
    id: z.number(),
    cluster: z.string(),
    images: z.array(
      z.object({
        id: z.number(),
        image: z.string(),
        cluster_name: z.number(),
      }),
    ),
  }),
);

export type GetClusterResponseType = z.infer<typeof GetClusterSchema>;
