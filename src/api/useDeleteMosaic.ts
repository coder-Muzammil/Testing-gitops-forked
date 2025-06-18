import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, deleteMosaicUrl } from "./apiConstants";

const useDeleteMosaic = ({ myTeamMosaics }: { myTeamMosaics: boolean }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMosaic"],
    mutationFn: (id: number) => {
      return axiosPrivate.delete(`${deleteMosaicUrl}${String(id)}/`);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getAllMosaics", myTeamMosaics],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDeleteMosaic;
