import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, deleteHeadlinesUrl } from "./apiConstants";

const useDeleteHeadline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteHeadline"],
    mutationFn: (id: number) => {
      return axiosPrivate.delete(`${deleteHeadlinesUrl}${String(id)}/`);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          predicate(query) {
            return query.queryKey.includes("headlinesTime");
          },
        })
        .catch((err: unknown) => {
          console.error(err);
        });
      queryClient
        .invalidateQueries({
          predicate(query) {
            return query.queryKey.includes("SttHeadlinesNews");
          },
        })
        .catch((err: unknown) => {
          console.error(err);
        });
      queryClient
        .invalidateQueries({
          queryKey: ["TickersHeadlinesNews"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
      queryClient
        .invalidateQueries({
          queryKey: ["FlashersHeadlinesNews"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDeleteHeadline;
