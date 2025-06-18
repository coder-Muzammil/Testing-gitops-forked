import { useMutation } from "@tanstack/react-query";
import { axiosPrivate, updateTickerUrl } from "./apiConstants";

export function useUpdatedTicker() {
  return useMutation({
    mutationKey: ["updateTicker"],
    mutationFn: ({
      id,
      editedOcrResult,
    }: {
      id: number;
      editedOcrResult: string;
    }) => {
      return axiosPrivate.patch(`${updateTickerUrl}${String(id)}/`, {
        editedOcrResult: editedOcrResult,
      });
    },
  });
}
