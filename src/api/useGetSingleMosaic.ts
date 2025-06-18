import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getAllMosaics } from "./apiConstants";
import { SingleMosaicType } from "./responseTypes/getAllMosaicsApi.types";

function useGetSingleMosaic(mosaicId: number) {
  const axiosInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ["getSingleMosaic", mosaicId],
    queryFn: () => {
      return axiosInstance.get<SingleMosaicType>(
        `${getAllMosaics}${String(mosaicId)}/`,
      );
    },
  });
}

export default useGetSingleMosaic;
