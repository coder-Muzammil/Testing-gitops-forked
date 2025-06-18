import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, deleteCollageUrl } from "./apiConstants";

const useDeleteCollage = ({ myTeamCollages }: { myTeamCollages: boolean }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCollage"],
    mutationFn: (id: number) => {
      return axiosPrivate.delete(`${deleteCollageUrl}${String(id)}/`);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getMyCollages", myTeamCollages],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDeleteCollage;
