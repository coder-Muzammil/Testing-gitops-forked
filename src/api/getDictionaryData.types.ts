import { z } from "zod";

export const GetDictionaryDataSchema = z.record(z.string(), z.string());

export type GetDictionaryDataResponse = z.infer<typeof GetDictionaryDataSchema>;
