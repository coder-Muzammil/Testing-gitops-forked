import { useMutation } from "@tanstack/react-query";
import { updateFlasherUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";

function useUpdateFlasherOCR() {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationKey: ["updateFlasherOCR"],
    mutationFn: ({
      id,
      editedOcrResult,
    }: {
      id: number;
      editedOcrResult: string;
    }) => {
      return axiosPrivate.patch(`${updateFlasherUrl}${String(id)}/`, {
        editedOcrResult: editedOcrResult,
      });
    },
  });
}

export default useUpdateFlasherOCR;
