import { useQuery } from "@tanstack/react-query";
import { manageConfigurationsUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { GetAllConfiguratorResponseType } from "./responseTypes/getAllConfigurators.types";



const useGetAllConfigurator = ({ channelId }: { channelId: number }) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["configurators", channelId],
    queryFn: async () => {
      const response = await axiosPrivate.get<GetAllConfiguratorResponseType>(manageConfigurationsUrl, {
        params: {
          channel_id: channelId,
        },
      });

      return response.data;
    },
  });
};

export default useGetAllConfigurator;
