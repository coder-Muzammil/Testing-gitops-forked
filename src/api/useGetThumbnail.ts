import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAllThumbnails } from "./apiConstants";
import {
  GetThumbnailResponseSchema,
  GetThumbnailResponseType,
} from "./responseTypes/useGetThumbnailApi.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
const useGetThumbnail = ({
  personId,
  channelName,
}: {
  personId: number;
  channelName: string;
}) => {
  const [searchParams] = useSearchParams();
  const startDate=searchParams.get("startDate");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  return useQuery({
    queryKey: ["getThumbnail", personId, channelName],
    queryFn: async () => {
      const response = await axios.get<GetThumbnailResponseType>(
        getAllThumbnails,
        {
          params: {
            id: personId,
            channelName,
            startDate,
            startTime,
            endTime,
          },
        },
      );
      if (import.meta.env.DEV) {
        return getSafeParsedDataAndLogIfError(
          GetThumbnailResponseSchema.safeParse(response.data),
        );
      }
      return response.data;
    },
  });
};
export default useGetThumbnail;
