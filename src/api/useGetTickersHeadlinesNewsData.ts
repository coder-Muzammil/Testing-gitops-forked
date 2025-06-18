import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getTickersHeadlinesNewsDataUrl } from "./apiConstants";
import { useSearchParams } from "react-router-dom";
import { SingleTickerType } from "./responseTypes/getAllTickersApi.types";

export type SingleTickersHeadlineNewsDataType = {
  time: string;
  id: number;
  data: Array<SingleTickerType>;
};

const useGetTickersHeadlinesNewsData = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "desc";
  const date = searchParams.get("date") ?? "";
  const timeList = searchParams.get("timeList") ?? "";

  // Parse channels from the URL parameter
  let parsedChannels: Array<Array<string>> = [];
  const channels = searchParams.get("playTimeChannels");

  if (channels) {
    try {
      parsedChannels = JSON.parse(channels.replace(/'/g, '"')) as Array<
        Array<string>
      >; // Parse the JSON-like string
    } catch (error) {
      console.error("Failed to parse channels:", channels, error);
    }
  }

  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["TickersHeadlinesNews", sort, timeList, parsedChannels, date],
    queryFn: async () => {
      const response = await axiosPrivate.get<
        Array<SingleTickersHeadlineNewsDataType>
      >(getTickersHeadlinesNewsDataUrl, {
        params: {
          reverseSorting: sort,
          timeList,
          channels: JSON.stringify(parsedChannels),
          date,
        },
      });

      return response.data;
    },
  });
};

export default useGetTickersHeadlinesNewsData;
