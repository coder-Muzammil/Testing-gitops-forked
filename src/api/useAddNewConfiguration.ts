import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { manageConfigurationsUrl } from "./apiConstants";
import { SingleConfiguratorType } from "./responseTypes/getAllConfigurators.types";

const useAddNewConfiguration = () => {
  const axiosInstance = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addNewConfiguration"],
    mutationFn: async (data: Omit<SingleConfiguratorType, "id">) => {
      return await axiosInstance.post(manageConfigurationsUrl, data);
    },

    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["configurators"] })
        .catch((err: unknown) => {
          console.error(err);
        });
    },

    // onError: () => {
    //   toast.error("Something went wrong, please try again later!");
    // },
  });
};

export default useAddNewConfiguration;
