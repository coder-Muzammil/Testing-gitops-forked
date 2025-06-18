import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  GetAllThumbnailsResponseSchema,
  GetAllThumbnailsResponseType,
  SingleThumbnailParamsType,
} from "./responseTypes/getAllThumbnailsApi.types";
import { getAllThumbnails } from "./apiConstants";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";

const useGetThumbnails = ({
  startTime,
  endTime,
  startDate,
  endDate,
  persons,
  identity,
  channels,
}: SingleThumbnailParamsType) => {
  return useInfiniteQuery({
    queryKey: [
      "getAllThumbnails",
      startDate,
      endDate,
      startTime,
      endTime,
      identity,
      persons,
      channels,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await axios.get<GetAllThumbnailsResponseType>(
        getAllThumbnails,
        {
          params: {
            page: pageParam,
            startTime,
            endTime,
            startDate,
            endDate,
            persons,
            identity,
            channels,
          },
        },
      );
      if (import.meta.env.DEV) {
        return getSafeParsedDataAndLogIfError(
          GetAllThumbnailsResponseSchema.safeParse(response.data),
        );
      }
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.paginationData.currentPage;
      const totalPages = lastPage.paginationData.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    select: (data) => {
      return data;
    },
  });
};
export default useGetThumbnails;
