import { z } from "zod";

export const TransiltrateWordSchema = z.object({
  original_text: z.string(),
  transliterated: z.array(z.string()),
});

export type TransiltratedWordType = z.infer<typeof TransiltrateWordSchema>;
