import { useQuery } from "@tanstack/react-query";
import { getAllHeadlinesUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import {
  headlineEntriesSchema,
  type MultipleHeadlineEntriesType,
} from "./responseTypes/manageHeadlines.types";

const useGetAllHeadlinesTime = () => {
  const axiosInstance = useAxiosPrivate();
  return useQuery({
    queryKey: ["headlinesTime"],
    queryFn: async () => {
      const response =
        await axiosInstance.get<MultipleHeadlineEntriesType>(
          getAllHeadlinesUrl,
        );

      return headlineEntriesSchema.parse(response.data);
    },
  });
};

export default useGetAllHeadlinesTime;
