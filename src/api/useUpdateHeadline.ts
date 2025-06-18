import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { updateHeadlinesUrl } from "./apiConstants";
// import { useSearchParams } from "react-router-dom";
type Data = {
  startTime: string;
  endTime: string;
  title: string;
  id: number;
  channels: Array<string>;
};
const useUpdateHeadline = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  // const [searchParams] = useSearchParams();

  // const channels = searchParams.get("playTimeChannels");
  // const channelArray = channels?.split(",").map((ch) => ch.trim()) ?? [];
  return useMutation({
    mutationKey: ["addNewHeadlineTime"],
    mutationFn: async (data: Data) => {
      await axiosPrivate.put(`${updateHeadlinesUrl}${String(data.id)}/`, {
        ...data,
        // channels: channelArray,
      });
    },
    onSuccess: (data) => {
      console.log("upated headline data", data);
      queryClient
        .invalidateQueries({
          queryKey: ["headlinesTime"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
      queryClient
        .invalidateQueries({
          queryKey: ["SttHeadlinesNews"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
      queryClient
        .invalidateQueries({
          queryKey: ["TickersHeadlinesNews"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
      queryClient
        .invalidateQueries({
          queryKey: ["FlashersHeadlinesNews"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useUpdateHeadline;
