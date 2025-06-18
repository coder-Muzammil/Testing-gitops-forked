import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { clusterUrl } from "./apiConstants";

import {
  GetClusterResponseType,
  GetClusterSchema,
} from "./responseTypes/getClusterApi.types";

const useGetCluster = () => {
  return useQuery({
    queryKey: ["getCluster"],
    queryFn: async () => {
      const response = await axios.get<GetClusterResponseType>(clusterUrl);
      GetClusterSchema.safeParse(response.data);
      return response.data;
    },
  });
};
export default useGetCluster;
