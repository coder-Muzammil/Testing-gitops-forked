import { useMutation } from "@tanstack/react-query";
import { addPlayTimeIntervalUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import {
  AddPlayTimeIntervalApiResponseType,
  AddPlayTimeIntervalPayloadType,
} from "./responseTypes/addPlayTimeInterval.types";

const useAddPlayTimeInterval = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["addPlayTimeInterval"],
    mutationFn: (data: AddPlayTimeIntervalPayloadType) => {
      return axiosPrivate.post<AddPlayTimeIntervalApiResponseType>(
        addPlayTimeIntervalUrl,
        data,
      );
    },
  });
};

export default useAddPlayTimeInterval;
