import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, dictionaryUrl } from "./apiConstants";

const useDeleteDictionaryText = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteDictionaryText"],
    mutationFn: (key: string) => {
      return axiosPrivate.delete(dictionaryUrl, {
        data: {
          key,
        },
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getDictionaryData"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDeleteDictionaryText;
