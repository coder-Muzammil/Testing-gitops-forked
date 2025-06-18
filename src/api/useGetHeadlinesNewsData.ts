import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getHeadlinesNewsDataUrl } from "./apiConstants";
import { SingleTranscriptionType } from "./responseTypes/liveTranscriptionsApi.types";
import { useSearchParams } from "react-router-dom";

export type SingleHeadlineNewsDataType = {
  time: string;
  id: number;
  data: Array<SingleTranscriptionType>;
  selectedChannels: Array<string>;
  title: string;
};

const useGetHeadlinesNewsData = ({
  selectedChannels,
  selectedTimeList,
  headlineTitle,
}: {
  selectedChannels: Array<Array<string>>;
  selectedTimeList: string;
  headlineTitle: Array<string>;
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "desc";
  const date = searchParams.get("date") ?? "";

  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [
      "SttHeadlinesNews",
      sort,
      selectedTimeList,
      selectedChannels,
      date,
      headlineTitle,
    ],
    queryFn: async () => {
      const response = await axiosPrivate.get<
        Array<SingleHeadlineNewsDataType>
      >(getHeadlinesNewsDataUrl, {
        params: {
          reverseSorting: sort,
          timeList: selectedTimeList,
          titles: JSON.stringify(headlineTitle),
          channels: JSON.stringify(selectedChannels),
          date,
        },
      });

      return response.data;
    },
  });
};

export default useGetHeadlinesNewsData;
