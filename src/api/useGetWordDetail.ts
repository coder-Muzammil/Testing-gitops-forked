import { useQuery } from "@tanstack/react-query";
import { wordDetailUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import {
  wordDetailApiResponseSchema,
  WordDetailApiResponseType,
} from "./responseTypes/getWordDetailApi.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";

function useGetWordDetail({ word }: { word: string }) {
  const axios = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const channel = searchParams.get("channel");
  const channels = channel ? channel.split(",") : [];
  const scope = searchParams.get("scope");
  const scopes = scope ? scope.split(",") : [];
  const hours = searchParams.get("hours") ?? "1:hour";

  return useQuery({
    queryKey: ["wordDetail", word, channels, scopes, hours],
    queryFn: async () => {
      const { data } = await axios.get<WordDetailApiResponseType>(
        wordDetailUrl,
        {
          params: {
            hours: hours,
            word: word,
            scopes: scopes,
            channels: channels,
          },
        },
      );

      return getSafeParsedDataAndLogIfError(
        wordDetailApiResponseSchema.safeParse(data),
      );
    },
    // refetchInterval: 30000,
  });
}

export default useGetWordDetail;
