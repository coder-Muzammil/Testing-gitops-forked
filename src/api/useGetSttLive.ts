import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSttLiveData } from "./apiConstants";
import {
  getSttLiveDataResponseType,
  getSttLiveDataResponseSchema,
} from "./responseTypes/getSttLiveDataApi.type";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";

const useGetSttLive = () => {
  const [searchParams] = useSearchParams();

  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const selectedChannel = searchParams.get("selectedChannel");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchText = searchParams.get("query") ?? "";

  // isLive is either null of false. If it's null, it means it's true
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return useQuery({
    queryKey: [
      "getSttLiveData",
      startDate,
      endDate,
      startTime,
      endTime,
      searchText,
      selectedChannel,
    ],
    queryFn: async () => {
      const response = await axios.get<getSttLiveDataResponseType>(
        getSttLiveData,
        {
          params: {
            filters: {
              startTime,
              endTime,
              startDate,
              endDate,
              searchText,
              selectedChannel,
            },
          },
        },
      );

      return getSafeParsedDataAndLogIfError(
        getSttLiveDataResponseSchema.safeParse(response.data),
      );
    },
    refetchInterval: isLive ? 90000 : false,
    enabled: !!selectedChannel,
  });
};

export default useGetSttLive;
