import { useState } from "react";
import useGetAllTeams from "../../../api/useGetAllTeams";
import SearchTeams from "./SearchTeams";
import TeamsList from "./TeamsList";
import SaveTeamsDataButton from "./SaveTeamsDataButton";
import { TeamEntitiesType } from "../../../utils/typeDefinations";
import useShareWithTeams from "../../../api/useShareWithTeams";
import toast from "react-hot-toast";
import CancelButton from "./CancelButton";
import { useQueryClient } from "@tanstack/react-query";

type SelectTeamsModalProps = {
  itemId: number;
  entityType: TeamEntitiesType;
  closerFn: () => void;
};

function SelectTeamsModal({
  itemId,
  entityType,
  closerFn,
}: SelectTeamsModalProps) {
  const { data } = useGetAllTeams();
  const [query, setQuery] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<Array<number>>([]);
  const { mutate: shareInTeams, isPending } = useShareWithTeams();
  const queryClient = useQueryClient();

  if (!data) {
    return null;
  }

  function getFilteredTeams() {
    return (
      data?.filter((team) => {
        return team.teamName.toLowerCase().includes(query.toLowerCase());
      }) ?? []
    );
  }

  const noOfTeamsSelected = selectedTeams.length;

  function handleShareInTeams() {
    if (noOfTeamsSelected === 0) {
      toast.error("Select atleast one team");
      return;
    }

    shareInTeams(
      { entity: entityType, ids: [itemId], teamIds: selectedTeams },
      {
        onSuccess: () => {
          closerFn();
          toast.success("Shared with teams successfully");
          queryClient
            .invalidateQueries({
              queryKey: ["getMyCollages"],
            })
            .catch((error: unknown) => {
              console.log(error);
            });
        },
        onError: () => {
          toast.error("Error sharing with teams");
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
      <div className="grid h-[70vh] w-[700px] grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white p-4 dark:bg-gray-700">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2">
          <SearchTeams query={query} setQuery={setQuery} />
          <SaveTeamsDataButton
            selectedTeams={selectedTeams}
            handleShareInTeams={handleShareInTeams}
            isPending={isPending}
          />
          <CancelButton closerFn={closerFn} />
        </div>
        <TeamsList
          teams={getFilteredTeams()}
          setSelectedTeams={setSelectedTeams}
          selectedTeams={selectedTeams}
        />
      </div>
    </div>
  );
}

export default SelectTeamsModal;
