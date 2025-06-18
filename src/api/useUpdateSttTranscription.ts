import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, updateSttTranscription } from "./apiConstants";

export function useUpdatedSttTranscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateSttTranscription"],
    mutationFn: ({
      id,
      newSttText,
    }: {
      id: number | undefined;
      newSttText: string;
    }) => {
      return axiosPrivate.patch(updateSttTranscription, {
        id: id,
        newSttText: newSttText,
      });
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
}
