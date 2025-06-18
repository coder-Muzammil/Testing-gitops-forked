import { useInfiniteQuery } from "@tanstack/react-query";
import { liveTranscriptionsUrl } from "./apiConstants";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "./useAxiosPrivate";
import {
  GetLiveTranscriptionsPaginatedDataSchema,
  GetLiveTranscriptionsPaginatedDataType,
} from "./responseTypes/liveTranscriptionsApi.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";

function useGetLiveTranscriptions() {
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();

  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const channels = searchParams.get("selectedChannel");
  const selectedChannel = channels?.split(",");

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchText = searchParams.get("query");
  // const sortingFlag = searchParams.get("revSort");
  const reverseSorting = null;
  // isLive is either null of false. If it's null, it means it's true
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return useInfiniteQuery({
    queryKey: [
      "liveTranscriptions",
      startDate,
      endDate,
      startTime,
      endTime,
      searchText,
      selectedChannel,
      reverseSorting,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1, signal }) => {
      const response =
        await axiosPrivate.get<GetLiveTranscriptionsPaginatedDataType>(
          liveTranscriptionsUrl,
          {
            params: {
              page: pageParam,
              startTime,
              endTime,
              startDate,
              endDate,
              searchText,
              selectedChannel,
              reverseSorting,
            },
            signal,
          },
        );

      return getSafeParsedDataAndLogIfError(
        GetLiveTranscriptionsPaginatedDataSchema.safeParse(response.data),
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

export default useGetLiveTranscriptions;
