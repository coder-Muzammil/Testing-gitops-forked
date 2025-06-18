import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDictionaryUrl, axiosPrivate } from "./apiConstants";

const useUpdateDictionary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      textEntries,
      videoId,
      source,
    }: {
      textEntries: Array<object>;
      videoId?: number;
      source: string;
    }) => {
      await axiosPrivate.post(updateDictionaryUrl, {
        updatedEntries: textEntries,
        videoId: videoId,
        source: source,
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
    },
  });
};

export default useUpdateDictionary;
