import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { dictionaryUrl } from "./apiConstants";
import { GetDictionaryDataResponse } from "./getDictionaryData.types";

const useGetDictionaryData = () => {
  return useQuery({
    queryKey: ["getDictionaryData"],
    queryFn: async () => {
      const response =
        await axios.get<GetDictionaryDataResponse>(dictionaryUrl);
      return response.data;
    },
  });
};
export default useGetDictionaryData;
