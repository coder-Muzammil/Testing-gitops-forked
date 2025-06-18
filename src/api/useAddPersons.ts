import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getAllTrainedPersons } from "./apiConstants";
import toast from "react-hot-toast";

type MutationArgs = {
  formData: FormData | number;
  method: string;
};
type AddPersonProps = {
  onClose?: () => void;
};
function useAddPerson({ onClose }: AddPersonProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, method }: MutationArgs) => {
      return await axios({
        url: getAllTrainedPersons,
        method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["getAllTrainedPersons"],
        })
        .catch((error: unknown) => {
          console.log(error);
        });

      if (onClose) {
        onClose(); // Ensure onClose is called only if it's defined
      }
      toast.success("Data updated successfully!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again later!");
    },
  });
}

export default useAddPerson;
