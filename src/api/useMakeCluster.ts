import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { clusterUrl } from "./apiConstants";
import { GetClusterResponseType } from "./responseTypes/getClusterApi.types";
type MutationFnType = {
  formData: FormData;
};
const useMakeCluster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: MutationFnType) => {
      try {
        const response = await axios.post<GetClusterResponseType>(
          clusterUrl,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        return response.data;
      } catch (error) {
        throw new Error("An error occurred while making cluster");
      }
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getCluster"],
        })
        .catch(() => {
          console.error("Error invalidating queries: ");
        });
    },
  });
};

export default useMakeCluster;
