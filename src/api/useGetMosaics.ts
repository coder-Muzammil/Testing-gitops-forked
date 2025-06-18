import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import {
  GetAllMosaicsResponseType,
  GetAllMosaicsSchema,
} from "./responseTypes/getAllMosaicsApi.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { getAllMosaics } from "./apiConstants";
import { useSearchParams } from "react-router-dom";

const useGetMosaics = ({ myTeamMosaics }: { myTeamMosaics: boolean }) => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  return useInfiniteQuery<GetAllMosaicsResponseType>({
    queryKey: ["getAllMosaics", myTeamMosaics, query],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await axiosPrivate.get<GetAllMosaicsResponseType>(
        getAllMosaics,
        {
          params: {
            page: pageParam,
            myTeamMosaics: myTeamMosaics ? "True" : "False",
            query,
          },
        },
      );

      return getSafeParsedDataAndLogIfError(
        GetAllMosaicsSchema.safeParse(response.data),
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
    refetchInterval: 30000,
  });
};
export default useGetMosaics;
