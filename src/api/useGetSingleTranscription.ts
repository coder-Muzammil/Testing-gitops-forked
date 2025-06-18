import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getTranscriptionsUrl } from "./apiConstants";
import { SingleSttCollageType } from "./responseTypes/getSttCollagesApi.types";

function useGetSingleTranscription(collageId: number) {
  const axiosInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ["getSingleSttCollage", collageId],
    queryFn: () => {
      return axiosInstance.get<SingleSttCollageType>(
        `${getTranscriptionsUrl}${String(collageId)}/`,
      );
    },
  });
}

export default useGetSingleTranscription;
