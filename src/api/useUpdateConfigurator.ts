import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { SingleConfiguratorType } from "./responseTypes/getAllConfigurators.types";
import { manageConfigurationsUrl } from "./apiConstants";

const useUpdateConfigurator = () => {
  const axiosInstance = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateConfigurator"],
    mutationFn: async ({
      data,
      id,
    }: {
      data: Omit<SingleConfiguratorType, "id">;
      id: number;
    }) => {
      return await axiosInstance.patch(
        `${manageConfigurationsUrl}${String(id)}/`,
        data,
      );
    },

    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["configurators"] })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useUpdateConfigurator;
