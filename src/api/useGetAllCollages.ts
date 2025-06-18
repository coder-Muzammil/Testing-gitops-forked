import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import {
  GetAllCollagesResponseType,
  GetAllCollagesSchema,
} from "./responseTypes/getMyCollagesApi.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { getCollagesUrl } from "./apiConstants";
import { useSearchParams } from "react-router-dom";

const useGetAllCollages = ({ myTeamCollages }: { myTeamCollages: boolean }) => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  return useInfiniteQuery<GetAllCollagesResponseType>({
    queryKey: ["getMyCollages", myTeamCollages, query],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await axiosPrivate.get<GetAllCollagesResponseType>(
        getCollagesUrl,
        {
          params: {
            page: pageParam,
            myTeamCollages: myTeamCollages ? "True" : "False",
            query: query,
          },
        },
      );

      return getSafeParsedDataAndLogIfError(
        GetAllCollagesSchema.safeParse(response.data),
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
  });
};
export default useGetAllCollages;
