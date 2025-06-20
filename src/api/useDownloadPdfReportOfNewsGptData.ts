import { useMutation } from "@tanstack/react-query";
import { downloadPdfReportOfNewsGptDataUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { NewsGptPromptresponseType } from "./useSendNewsGptCommands";

const useDownloadPdfReportOfNewsGptData = () => {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationKey: ["downloadPdfReportOfNewsGptData"],
    mutationFn: async ({
      data,
      isSave,
    }: {
      data: NewsGptPromptresponseType;
      isSave: boolean;
    }) => {
      const response = await axiosPrivate.post<Blob>(
        downloadPdfReportOfNewsGptDataUrl,
        { data, isSave },
        { responseType: "blob" },
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch the report");
      }

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "PdfReport.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  });
};

export default useDownloadPdfReportOfNewsGptData;
