import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import {
  GetTopOccurringWordsApiResponseSchema,
  GetTopOccurringWordsApiResponseType,
} from "./responseTypes/getTopOccurringWordsApi.types";
import { useSearchParams } from "react-router-dom";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { getWordCloudData } from "./apiConstants";

function useGetTopWords() {
  const axios = useAxiosPrivate();
  const [searchParams] = useSearchParams();

  //   TODO: some of params can't be null. like channelType etc. do nullish coalescing for them
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const scope = searchParams.get("scope");
  const scopes = scope ? scope.split(",") : [];
  const hours = searchParams.get("hours") ?? null;

  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return useQuery({
    queryKey: [
      "topWords",
      startDate,
      endDate,
      startTime,
      endTime,
      scopes,
      hours,
    ],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<GetTopOccurringWordsApiResponseType>(
        getWordCloudData,
        {
          params: {
            startTime,
            endTime,
            startDate,
            endDate,
            scope: scopes,
            hours,
          },
          signal,
        },
      );
      return getSafeParsedDataAndLogIfError(
        GetTopOccurringWordsApiResponseSchema.safeParse(data),
      );
    },
    refetchInterval: isLive ? 30000 : false,
  });
}

export default useGetTopWords;
