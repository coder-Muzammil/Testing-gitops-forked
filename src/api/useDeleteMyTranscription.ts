import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, deleteMyTranscriptionUrl } from "./apiConstants";

const useDeleteMyTranscription = ({
  myTranscriptionsCollages,
}: {
  myTranscriptionsCollages: boolean;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMyTranscription"],
    mutationFn: (id: number) => {
      return axiosPrivate.delete(`${deleteMyTranscriptionUrl}${String(id)}/`);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getMySttCollages", myTranscriptionsCollages],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDeleteMyTranscription;
