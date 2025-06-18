import { useQuery } from "@tanstack/react-query";
import { getAllTeams } from "./apiConstants";

import { useAxiosPrivate } from "./useAxiosPrivate";
import { SingleTeamType } from "./responseTypes/getAllTeamsApi.types";

const useGetAllTeams = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["getAllTeams"],
    queryFn: async () => {
      const response =
        await axiosPrivate.get<Array<SingleTeamType>>(getAllTeams);
      return response.data;
    },
  });
};
export default useGetAllTeams;
