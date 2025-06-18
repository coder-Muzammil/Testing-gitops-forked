import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { addHeadlinesUrl } from "./apiConstants";
import { type AddHeadlinesApiResponseType } from "./responseTypes/manageHeadlines.types";
// import { useSearchParams } from "react-router-dom";

const useAddNewHeadlineTime = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  // const [searchParams] = useSearchParams();

  // const channels = searchParams.get("playTimeChannels");
  // const channelArray = channels?.split(",").map((ch) => ch.trim()) ?? [];

  return useMutation({
    mutationKey: ["addNewHeadlineTime"],
    mutationFn: async (data: AddHeadlinesApiResponseType) => {
      try {
        await axiosPrivate.post(addHeadlinesUrl, {
          ...data,
          // channels: channelArray,
        });
      } catch (error) {
        console.error("Error adding new headline time:", error);
        throw error; // Rethrow to trigger onError in case of failure
      }
    },
    onSuccess: () => {
      // Invalidate related queries to refresh data
      queryClient
        .invalidateQueries({ queryKey: ["headlinesTime"] })
        .catch((err: unknown) => {
          console.error("Error invalidating 'headlinesTime' query:", err);
        });

      queryClient
        .invalidateQueries({ queryKey: ["SttHeadlinesNews"] })
        .catch((err: unknown) => {
          console.error("Error invalidating 'SttHeadlinesNews' query:", err);
        });
      queryClient
        .invalidateQueries({ queryKey: ["TickersHeadlinesNews"] })
        .catch((err: unknown) => {
          console.error(
            "Error invalidating 'TickersHeadlinesNews' query:",
            err,
          );
        });
      queryClient
        .invalidateQueries({ queryKey: ["FlashersHeadlinesNews"] })
        .catch((err: unknown) => {
          console.error(
            "Error invalidating 'FlashersHeadlinesNews' query:",
            err,
          );
        });
    },
    onError: (error: unknown) => {
      // Handle mutation error (if any)
      console.error("Mutation failed:", error);
    },
  });
};

export default useAddNewHeadlineTime;
