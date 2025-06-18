import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { saveSttTranscriptions } from "./apiConstants";
import {
  GetAllSttCollagesResponseType,
  GetAllSttCollagesSchema,
} from "./responseTypes/getSttCollagesApi.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";

const useGetSttTranscriptionCollages = ({
  myTranscriptionsCollages,
}: {
  myTranscriptionsCollages: boolean;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get("contentType");
  const query = searchParams.get("query");
  return useInfiniteQuery({
    queryKey: ["getMySttCollages", myTranscriptionsCollages, query],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await axiosPrivate.get<GetAllSttCollagesResponseType>(
        saveSttTranscriptions,
        {
          params: {
            page: pageParam,
            myTeamTranscriptions: myTranscriptionsCollages ? "True" : "False",
            contentType,
            query,
          },
        },
      );

      return getSafeParsedDataAndLogIfError(
        GetAllSttCollagesSchema.safeParse(response.data),
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
export default useGetSttTranscriptionCollages;
