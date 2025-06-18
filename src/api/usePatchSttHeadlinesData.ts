import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getHeadlinesNewsDataUrl } from "./apiConstants";
import { UpdatedPlayTimeDataMethodPropsType } from "../components/modules/LiveStt/newsGptAndPlayTime/UpdatePlayTimeRowData";
import toast from "react-hot-toast";

const usePatchSttPlayTimeData = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["patchSttHeadlinesNews"],
    mutationFn: async (data: UpdatedPlayTimeDataMethodPropsType) => {
      return await axiosPrivate.patch(getHeadlinesNewsDataUrl, data);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["SttHeadlinesNews"] })
        .catch((err: unknown) => {
          console.error(err);
        });
      toast.success("Data updated successfully");
    },
    onError: (error: unknown) => {
      toast.error(String(error));
    },
  });
};

export default usePatchSttPlayTimeData;
