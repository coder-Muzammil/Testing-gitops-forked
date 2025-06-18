import { useInfiniteQuery } from "@tanstack/react-query";
import { myClipsUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { MyClipsApiResponseType } from "./responseTypes/getMyClipsApi.types";
import { useSearchParams } from "react-router-dom";

export const useGetMyClips = ({ getTeamClips }: { getTeamClips: boolean }) => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  return useInfiniteQuery({
    queryKey: ["getMyClips", query, getTeamClips],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await axiosPrivate.get<MyClipsApiResponseType>(
        myClipsUrl,
        {
          params: {
            page: pageParam,
            query,
            myTeamClips: getTeamClips,
          },
        },
      );
      return response.data;
    },

    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination_data.current_page;
      const totalPages = lastPage.pagination_data.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    refetchInterval: 30000,
    select(data) {
      return data;
    },
  });
};
