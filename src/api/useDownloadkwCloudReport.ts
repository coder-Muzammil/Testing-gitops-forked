import { useMutation } from "@tanstack/react-query";
import { downloadkwCloudReportUrl } from "./apiConstants";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

type DownloadPDFResponseType = Blob;

const useDownloadkwCloudReport = () => {
  //   const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";
  const startTime = searchParams.get("startTime") ?? "";
  const endTime = searchParams.get("endTime") ?? "";
  const hours = searchParams.get("hours") ?? "";

  const channel = searchParams.get("channel");
  const channels = channel?.split(",") ?? [];

  const scope = searchParams.get("scope");
  const scopes = scope?.split(",") ?? [];

  const live = searchParams.get("isLive");
  const isLive = Boolean(live);

  return useMutation({
    mutationKey: [
      "downloadkwCloudReport",
      startDate,
      endDate,
      startTime,
      endTime,
      channels,
      hours,
      scopes,
      isLive,
    ],
    mutationFn: async ({ word }: { word: string }) => {
      const formData = new FormData();
      formData.append("word", word);
      formData.append("startDate", String(startDate));
      formData.append("endDate", String(endDate));
      formData.append("startTime", String(startTime));
      formData.append("endTime", String(endTime));
      formData.append("channels", String(channels));
      formData.append("hours", String(hours));
      formData.append("scopes", String(scopes));
      formData.append("isLive", String(!isLive));

      const response = await axios.post<DownloadPDFResponseType>(
        downloadkwCloudReportUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch the report");
      }
      console.log({ wcResp: response.data });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return response;
    },
  });
};

export default useDownloadkwCloudReport;
