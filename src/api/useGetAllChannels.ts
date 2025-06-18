import { useQuery } from "@tanstack/react-query";
import { getAllChannels } from "./apiConstants";
import {
  GetAllChannelsApiResponseSchema,
  GetAllChannelsApiResponseType,
} from "./responseTypes/getAllChannelsApi.types";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";

const useGetAllChannels = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["getAllChannels"],
    queryFn: async () => {
      const response =
        await axiosPrivate.get<GetAllChannelsApiResponseType>(getAllChannels);

      if (import.meta.env.DEV) {
        return getSafeParsedDataAndLogIfError(
          GetAllChannelsApiResponseSchema.safeParse(response.data),
        );
      }

      return response.data;
    },
    refetchInterval: 20000,
  });
};
export default useGetAllChannels;
