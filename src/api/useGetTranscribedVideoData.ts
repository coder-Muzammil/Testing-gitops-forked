import { useQuery } from "@tanstack/react-query";
import { transcribeSttVideo } from "./apiConstants";
import {
  GetTranscribedVideoDataApiResponseSchema,
  GetTranscribedVideoDataApiResponseType,
} from "./useGetTranscribedVideoData.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import { useAxiosPrivate } from "./useAxiosPrivate";

const useGetTranscribedVideoData = (id: number) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["getTranscribeVideoData", id],
    queryFn: async () => {
      const response =
        await axiosPrivate.get<GetTranscribedVideoDataApiResponseType>(
          `${transcribeSttVideo}${String(id)}/`,
        );

      if (import.meta.env.DEV) {
        return getSafeParsedDataAndLogIfError(
          GetTranscribedVideoDataApiResponseSchema.safeParse(response.data),
        );
      }

      return response.data;
    },
  });
};
export default useGetTranscribedVideoData;
