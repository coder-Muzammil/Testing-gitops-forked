import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  SMMCloudApiResponseSchema,
  SMMCloudApiResponseType,
} from "./responseTypes/getSMMCloudApi.types";
import { useSearchParams } from "react-router-dom";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { getSMMKwCloudUrl } from "./apiConstants";

const useGetSMMCloud = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const hours = searchParams.get("hours");

  const channel = searchParams.get("channel");
  const channels = channel?.split(",") ?? [];

  const scope = searchParams.get("scope");
  const scopes = scope?.split(",") ?? [];

  const live = searchParams.get("isLive");
  const isLive = Boolean(live);

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
    ],
    queryFn: async () => {
      const response = await axios.get<SMMCloudApiResponseType>(
        getSMMKwCloudUrl,
        {
          params: {
            startDate,
            endDate,
            startTime,
            endTime,
            channels,
            hours,
            scopes,
            isLive: !isLive,
          },
        },
      );

      return getSafeParsedDataAndLogIfError(
        SMMCloudApiResponseSchema.safeParse(response.data),
      );
    },
    refetchInterval: !isLive ? 120000 : false,
  });
};

export default useGetSMMCloud;
