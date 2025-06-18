import { useInfiniteQuery } from "@tanstack/react-query";
import { liveSttTopics } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useSearchParams } from "react-router-dom";
import {
  GetLiveSttTopicsPaginatedDataSchema,
  GetLiveSttTopicsResponseType,
} from "./responseTypes/getLiveSttTopicsApi.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";

function useGetSttLiveTopics() {
  const [searchParams] = useSearchParams();

  const axiosPrivate = useAxiosPrivate();

  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const channels = searchParams.get("channel");
  const selectedChannel = channels ? channels.split(",") : [];

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchText = searchParams.get("query") ?? "";

  // isLive is either null of false. If it's null, it means it's true
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return useInfiniteQuery({
    queryKey: [
      "liveSttTopics",
      startDate,
      endDate,
      startTime,
      endTime,
      searchText,
      selectedChannel,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1, signal }) => {
      const response = await axiosPrivate.get<GetLiveSttTopicsResponseType>(
        liveSttTopics,
        {
          params: {
            page: pageParam,
            startTime,
            endTime,
            startDate,
            endDate,
            searchText,
            selectedChannel,
          },
          signal
        },
      );
      return getSafeParsedDataAndLogIfError(
        GetLiveSttTopicsPaginatedDataSchema.safeParse(response.data),
      );
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination_data.current_page;
      const totalPages = lastPage.pagination_data.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    select: (data) => {
      return data;
    },
    refetchInterval: isLive ? 3000 : false,
  });
}

export default useGetSttLiveTopics;
