import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { translateSttChunksUrl } from "./apiConstants";
import { TranslateSttChunksApiResponse } from "./responseTypes/getTranslateSttChunks.types";

const useTranslateSttChunks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      selectedChunks,
      videoId,
    }: {
      selectedChunks: Array<number>;
      videoId: number | undefined;
    }) => {
      const response = await axios.post<TranslateSttChunksApiResponse>(
        translateSttChunksUrl,
        {
          sttIds: selectedChunks,
          videoId: videoId,
        },
      );
      return response.data;
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

export default useTranslateSttChunks;
