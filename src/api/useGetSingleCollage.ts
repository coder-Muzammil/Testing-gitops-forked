import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getCollagesUrl } from "./apiConstants";
import { SingleCollageType } from "./responseTypes/getMyCollagesApi.types";

function useGetSingleCollage(collageId: number) {
  const axiosInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ["getSingleCollage", collageId],
    queryFn: () => {
      return axiosInstance.get<SingleCollageType>(
        `${getCollagesUrl}${String(collageId)}/`,
      );
    },
  });
}

export default useGetSingleCollage;
