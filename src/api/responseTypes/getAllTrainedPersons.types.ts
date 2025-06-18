import { z } from "zod";

export const SingleTrainedPersonSchema = z.object({
  id: z.number(),
  personName: z.string(),
  thumbnail: z.string(),
  images: z.array(
    z.object({
      id: z.number(),
      image: z.string(),
    }),
  ),
});
export type SingleTrainedPersonType = z.infer<typeof SingleTrainedPersonSchema>;

export const GetAllTrainedPersonsSchema = z.array(SingleTrainedPersonSchema);

export type GetAllTrainedPersonsResponseType = z.infer<
  typeof GetAllTrainedPersonsSchema
>;
