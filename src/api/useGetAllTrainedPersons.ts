import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import {
  GetAllTrainedPersonsResponseType,
  GetAllTrainedPersonsSchema,
} from "./responseTypes/getAllTrainedPersons.types";
import { getAllTrainedPersons } from "./apiConstants";

const useGetAllTrainedPersons = () => {
  return useQuery({
    queryKey: ["getAllTrainedPersons"],
    queryFn: async () => {
      const response =
        await axios.get<GetAllTrainedPersonsResponseType>(getAllTrainedPersons);
      GetAllTrainedPersonsSchema.safeParse(response.data);
      return response.data;
    },
  });
};
export default useGetAllTrainedPersons;
