import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dictionaryUrl, axiosPrivate } from "./apiConstants";

const useDictionary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoId,
      sttLiveIds,
      source,
    }: {
      videoId?: number;
      sttLiveIds?: Array<number>;
      source: string;
    }) => {
      await axiosPrivate.post(dictionaryUrl, {
        videoId: videoId,
        source: source,
        sttLiveIds: sttLiveIds,
      });
      // return response.data;
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getTranscribeVideoData"],
        })

        .catch((err: unknown) => {
          console.error(err);
        });
      queryClient
        .invalidateQueries({
          queryKey: ["liveTranscriptions"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDictionary;
