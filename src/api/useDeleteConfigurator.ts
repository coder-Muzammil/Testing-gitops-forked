import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { manageConfigurationsUrl } from "./apiConstants";
import toast from "react-hot-toast";

const useDeleteConfigurator = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axiosPrivate.delete(
        `${manageConfigurationsUrl}${String(id)}/`,
      );
    },

    onSuccess: () => {
      toast.success("Configuration deleted successfully");
      queryClient
        .invalidateQueries({ queryKey: ["configurators"] })
        .catch((err: unknown) => {
          console.error(err);
        });
    },

    onError: () => {
      toast.error("Error deleting configuration");
    },
  });
};

export default useDeleteConfigurator;
