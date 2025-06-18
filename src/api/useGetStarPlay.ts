import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getStarPlayUrl } from "./apiConstants";
import { GetStarPlayResponse } from "./responseTypes/getStarPlayApi.types";
const useGetStarPlay = ({
  channelName,
  date,
  time,
  source,
}: {
  channelName: string;
  date: string;
  time: number | string;
  source: string;
}) => {
  return useQuery({
    queryKey: ["getStarPlay", channelName, date, time, source],
    queryFn: async () => {
      const response = await axios.get<GetStarPlayResponse>(getStarPlayUrl, {
        params: {
          channelName,
          date,
          time,
          source,
        },
      });
      return response.data;
    },
    retry: 0,
  });
};
export default useGetStarPlay;
