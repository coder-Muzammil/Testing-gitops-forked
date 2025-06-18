import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { gptCommondsPromptApiUrl } from "./apiConstants";
import toast from "react-hot-toast";

type NewsGptPromptRequestType = {
  text: string;
  date?: string;
  time?: string;
};

export type NewsGptPromptresponseType = {
  result: string;
  isUrdu: boolean;
  is_logo?: boolean;
  is_table?: boolean;
};

const useSendNewsGptCommands = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["sendNewsGptCommands"],
    mutationFn: async ({
      prompt,
      data,
      times,
      showLogo,
      showTable,
    }: {
      prompt?: string;
      data: Array<NewsGptPromptRequestType>;
      times?: Array<{ time: string; title: string }>;
      showLogo?: boolean;
      showTable?: boolean;
    }) => {
      const response = await axiosPrivate.post<NewsGptPromptresponseType>(
        gptCommondsPromptApiUrl,
        {
          prompt,
          data,
          times,
          is_logo: showLogo,
          is_table: showTable,
        },
      );

      return response.data;
    },
    onError: (error: unknown) => {
      toast.error(String(error));
    },
  });
};

export default useSendNewsGptCommands;
