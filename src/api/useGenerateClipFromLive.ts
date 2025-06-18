import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { generationClipFromLive } from "./apiConstants";

type generateClipFromLiveType = {
  channelId: number;
  date: string;
  startTime: number;
  endTime: number;
  fileName: string;
};

type generateClipFromLiveResponseType = {
  videoChunk: string;
  postersPath: Array<string>;
};

export const useGenerateClipFromLive = (channelId: number) => {
  return useMutation({
    mutationKey: ["generateClipFromLive", channelId],
    mutationFn: (data: generateClipFromLiveType) => {
      return axios.post<generateClipFromLiveResponseType>(
        generationClipFromLive,
        data,
      );
    },
  });
};
