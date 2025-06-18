import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { downloadNewsGptReportVideoURL } from "./apiConstants";
import toast from "react-hot-toast";

export type DownloadVideoFileOfNewsGptReportType = {
  startTime: string;
  endTime: string;
  channelName: string;
};

const useDownloadNewsGptReportVideo = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationKey: ["downloadVideoFileOfNewsGptReport"],
    mutationFn: async ({
      data,
    }: {
      data: DownloadVideoFileOfNewsGptReportType;
    }) => {
      const response = await axiosPrivate.post<Blob>(
        downloadNewsGptReportVideoURL,
        data,
        { responseType: "blob" },
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch the report");
      }

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    onError: () => {
      toast.error("No chunks found in the specified time range.");
    },
  });
};

export default useDownloadNewsGptReportVideo;
