import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getSttVideoTranscription } from "./apiConstants";
import { useSearchParams } from "react-router-dom";
import { SingleSttCollageType } from "./responseTypes/getSttCollagesApi.types";

function useGetSingleSttVideoTranscription(id: number) {
  const axiosInstance = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get("contentType");
  const query=searchParams.get("query");
  return useQuery({
    queryKey: ["getSingleSttVideoTranscription", id,query],
    queryFn: () => {
      return axiosInstance.get<SingleSttCollageType>(`${getSttVideoTranscription}${String(id)}/`, {
        params: {
          contentType,
          query,
        },
      });
    },
  });
}

export default useGetSingleSttVideoTranscription;
