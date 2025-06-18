import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { shareWithTeamsUrl } from "./apiConstants";

type MutationVariables = {
  entity: string;
  ids: Array<number>;
  teamIds: Array<number>;
};

function useShareWithTeams() {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["shareWithTeams"],
    mutationFn(sharingDetails: MutationVariables) {
      return axiosPrivate.post(shareWithTeamsUrl, sharingDetails);
    },
  });
}

export default useShareWithTeams;
