import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, deleteMySttUploadUrl } from "./apiConstants";

const useDeleteMySttUpload = ({
  myTranscriptionsCollages,
}: {
  myTranscriptionsCollages: boolean;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMySttUpload"],
    mutationFn: (id: number) => {
      return axiosPrivate.delete(`${deleteMySttUploadUrl}${String(id)}/`, {
        params: {
          contentType: "sttUploads",
        },
      });
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

export default useDeleteMySttUpload;
