import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { liveTranscriptionsUrl } from "./apiConstants";

export function useUpdateSttText() {
  return useMutation({
    mutationKey: ["updateSttText"],
    mutationFn: (data: { transcriptionId: number; updatedText: string }) => {
      const { transcriptionId, updatedText } = data;

      return axios.patch(
        `${liveTranscriptionsUrl}${String(transcriptionId)}/`,
        {
          updatedText: updatedText,
        },
      );
    },
  });
}
