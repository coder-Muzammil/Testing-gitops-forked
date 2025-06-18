import { useQuery } from "@tanstack/react-query";
import { getSMMkwCloudDetailUrl } from "./apiConstants";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import {
  singleWordApiResponseSchema,
  SingleWordApiResponseType,
} from "./responseTypes/getSMMCloudSingleWord.types";

const useGetSMMCloudSingleWord = ({ word }: { word: string }) => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const channel = searchParams.get("channel");
  const channels = channel?.split(",") ?? [];

  const hours = searchParams.get("hours");
  const scope = searchParams.get("scope");
  const scopes = scope?.split(",") ?? [];
  const isLive = searchParams.get("isLive");

  return useQuery({
    queryKey: [
      "getSMMCloud",
      channels,
      endDate,
      endTime,
      hours,
      scopes,
      startDate,
      startTime,
      isLive,
      word,
    ],
    queryFn: async () => {
      const response = await axios.get<SingleWordApiResponseType>(
        getSMMkwCloudDetailUrl,
        {
          params: {
            startDate,
            endDate,
            startTime,
            endTime,
            channels,
            hours,
            scopes,
            isLive,
            word,
          },
        },
      );

      return getSafeParsedDataAndLogIfError(
        singleWordApiResponseSchema.safeParse(response.data),
      );
    },
    refetchInterval: isLive ? 30000 : false,
  });
};

export default useGetSMMCloudSingleWord;
