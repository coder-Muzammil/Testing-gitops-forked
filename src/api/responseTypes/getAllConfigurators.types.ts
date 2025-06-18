import { z } from "zod";

const singleConfiguratorSchema = z.object({
  channels: z.array(z.number()),
  date: z.object({
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
  }),
  end_time: z.string(),
  id: z.number(),
  start_time: z.string(),
});

export type SingleConfiguratorType = z.infer<typeof singleConfiguratorSchema>;

const getAllConfiguratorsSchema = z.array(singleConfiguratorSchema);

export type GetAllConfiguratorResponseType = z.infer<
  typeof getAllConfiguratorsSchema
>;
