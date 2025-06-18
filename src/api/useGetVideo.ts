import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getVideoUrl } from "./apiConstants";
import { GetAllChannelsApiResponseSchema } from "./responseTypes/getAllChannelsApi.types";
import { GetVideoResponseType } from "./responseTypes/getVideoApi.types";
type IdsType = {
  ids: Array<number>;
};
const useGetVideo = ({ ids }: IdsType) => {
  return useQuery({
    queryKey: ["getVideo", ids],
    queryFn: async () => {
      const response = await axios.get<GetVideoResponseType>(getVideoUrl, {
        params: {
          ids: ids.join(","),
        },
      });
      GetAllChannelsApiResponseSchema.safeParse(response.data);
      return response.data;
    },
    enabled: ids.length !== 0,
  });
};
export default useGetVideo;
