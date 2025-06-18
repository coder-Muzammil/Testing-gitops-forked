import { z } from "zod";

// ************************* Add New Headlines Response Types *************************
export const AddHeadlinesApiResponseSchema = z.object({
  title: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  channels: z.array(z.string()),
});

export type AddHeadlinesApiResponseType = z.infer<
  typeof AddHeadlinesApiResponseSchema
>;

// ************************* Get All Headlines Response Types *************************

const singleHeadlineEntrySchema = z.object({
  label: z.object({
    name: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
  id: z.number(),
  value: z.string(),
  channels: z.array(z.string()),
});
export type SingleHeadlineEntryType = z.infer<typeof singleHeadlineEntrySchema>;

export const headlineEntriesSchema = z.array(singleHeadlineEntrySchema);

export type MultipleHeadlineEntriesType = z.infer<typeof headlineEntriesSchema>;
