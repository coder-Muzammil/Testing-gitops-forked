import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getTickersTranslatedOcrDataUrl } from "./apiConstants";
import toast from "react-hot-toast";
import { GetAllTickersTranslateResponseType } from "./useTranslateTickerType";

const useTranslateTickersOcr = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      selectedRecords,
      source,
    }: {
      selectedRecords: Array<number>;
      source: string;
    }) => {
      const response = await axios.post<GetAllTickersTranslateResponseType>(
        getTickersTranslatedOcrDataUrl,
        {
          selectedRecords,
          source,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Translate successfully");
      queryClient
        .invalidateQueries({
          queryKey: ["getAllTickers"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useTranslateTickersOcr;
