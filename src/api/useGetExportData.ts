import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const fetchExportData = async (url: string) => {
  const currentParams = window.location.search;
  const separator = currentParams ? "&" : "?";
  const backendUrl = `${url}${currentParams}${separator}exporting=true`;

  const response = await axios.get(backendUrl, {
    responseType: "blob",
  });

  return response.data as Blob;
};

const useGetExportData = () => {
  return useMutation<Blob, Error, string>({
    mutationFn: (url: string) => fetchExportData(url),
  });
};

export default useGetExportData;
