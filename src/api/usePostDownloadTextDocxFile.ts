import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { downloadTextDocxFile } from "./apiConstants";

export type Chunk = {
  text: string;
  srName: string;
};
const usePostDownloadTextDocxFile = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["downloadTextDocxFile"],
    mutationFn: async ({
      title,
      chunks,
      fileName,
    }: {
      title: string;
      chunks: Array<Chunk>;
      fileName: string;
    }) => {
      const response = await axiosPrivate.post(
        downloadTextDocxFile,
        {
          title,
          chunks,
          filename: fileName,
        },
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  });
};

export default usePostDownloadTextDocxFile;
