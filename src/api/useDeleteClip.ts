import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, deleteClipUrl } from "./apiConstants";

const useDeleteMyClip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteMyClip"],
    mutationFn: (id: number) => {
      return axiosPrivate.delete(`${deleteClipUrl}${String(id)}/`);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          predicate(query) {
            return query.queryKey.includes("getMyClips");
          },
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDeleteMyClip;
