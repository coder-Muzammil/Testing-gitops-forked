import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { manageConfigurationsUrl } from "./apiConstants";
import { SingleConfiguratorType } from "./responseTypes/getAllConfigurators.types";

const useGetSingleConfigurator = (id: number | undefined, options?: UseQueryOptions<SingleConfiguratorType>) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery<SingleConfiguratorType>({
    queryKey: ["getSingleConfigurator", id, options],
    queryFn: async () => {
      const response = await axiosPrivate.get<SingleConfiguratorType>(
        `${manageConfigurationsUrl}${String(id)}/`,
      );
      return response.data;
    },
    enabled: !!id, // don't run if id is undefined
    ...options,
  });
};

export default useGetSingleConfigurator;
