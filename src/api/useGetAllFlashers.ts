import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllFlashersUrl } from "./apiConstants";
import { useSearchParams } from "react-router-dom";
import { GetAllFlashersResponseType } from "./responseTypes/getFlashersApi.types";
import { useAxiosPrivate } from "./useAxiosPrivate";

const useGetAllFlashers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const channel = searchParams.get("channel");
  const flasherFrame = searchParams.get("isfullframe");
  const isfullframe = Boolean(flasherFrame);
  const sortingFlag = searchParams.get("revSort");
  const reverseSorting = Boolean(sortingFlag);

  // isLive is either null of false. If it's null, it means it's true
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return useInfiniteQuery<GetAllFlashersResponseType>({
    queryKey: [
      "getAllFlashers",
      query,
      startDate,
      endDate,
      startTime,
      endTime,
      channel,
      isfullframe,
      reverseSorting,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const response = await axiosPrivate.get<GetAllFlashersResponseType>(
        getAllFlashersUrl,
        {
          params: {
            page: pageParam,
            query,
            startDate,
            endDate,
            startTime,
            endTime,
            channel,
            isfullframe,
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
    select: (data) => {
      return data;
    },

    refetchInterval: isLive ? 3000 : false,
  });
};
export default useGetAllFlashers;
