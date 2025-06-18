import { useMutation } from "@tanstack/react-query";
import { saveClipMetadata } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";

type PostClipMetadataType = {
  title: string;
  description: string;
  tags: string;
  comment: string;
  clipFileUrl: string;
  channelId: number;
  channelName: string;
  clipPosterUrl: string;
};

export const usePostClipMetadata = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationKey: ["postClipMetadata"],
    mutationFn: (data: PostClipMetadataType) =>
      axiosPrivate.post(saveClipMetadata, data),
  });
};
