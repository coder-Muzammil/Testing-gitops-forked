import { useInfiniteQuery } from "@tanstack/react-query";
import { GetAllTickersResponseType } from "./responseTypes/getAllTickersApi.types";
import { getTickersUrl } from "./apiConstants";
import { useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "./useAxiosPrivate";

const useGetAllTickers = () => {
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const query = searchParams.get("query");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const channel = searchParams.get("channel");
  const sortingFlag = searchParams.get("revSort");
  const reverseSorting = Boolean(sortingFlag);
  // isLive is either null of false. If it's null, it means it's true
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return useInfiniteQuery<GetAllTickersResponseType>({
    queryKey: [
      "getAllTickers",
      query,
      startDate,
      endDate,
      startTime,
      endTime,
      channel,
      reverseSorting,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const response = await axiosPrivate.get<GetAllTickersResponseType>(
        getTickersUrl,
        {
          params: {
            page: pageParam,
            query,
            startDate,
            endDate,
            startTime,
            endTime,
            channel,
            reverseSorting,
          },
          signal,
        },
      );

      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination_data.current_page;
      const totalPages = lastPage.pagination_data.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    refetchInterval: isLive ? 3000 : false,
  });
};
export default useGetAllTickers;
