import { z } from "zod";

export const useDownloadS3ImagesSchema = z.object({
  image_urls: z.array(
    z.object({
      imageUrl: z.string(),
      channelLogoUrl: z.string(),
    }),
  ),
});

export type UseDownloadS3ImagesType = z.infer<typeof useDownloadS3ImagesSchema>;
