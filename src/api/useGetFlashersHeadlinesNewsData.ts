import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getFlasherssHeadlinesNewsDataUrl } from "./apiConstants";
import { useSearchParams } from "react-router-dom";
import { SingleFlasherType } from "./responseTypes/getFlashersApi.types";

export type SingleFlashersHeadlineNewsDataType = {
  time: string;
  id: number;
  data: Array<SingleFlasherType>;
};

const useGetFlashersHeadlinesNewsData = () => {
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
    queryKey: ["FlahersHeadlinesNews", sort, timeList, parsedChannels, date],
    queryFn: async () => {
      const response = await axiosPrivate.get<
        Array<SingleFlashersHeadlineNewsDataType>
      >(getFlasherssHeadlinesNewsDataUrl, {
        params: {
          reverseSorting: sort,
          timeList,
          channels: JSON.stringify(parsedChannels), // Send the channels in the required format
          date,
        },
      });

      return response.data;
    },
  });
};

export default useGetFlashersHeadlinesNewsData;
