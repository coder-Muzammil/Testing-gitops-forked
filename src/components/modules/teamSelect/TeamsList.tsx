import { twMerge } from "tailwind-merge";
import { SingleTeamType } from "../../../api/responseTypes/getAllTeamsApi.types";

function TeamsList({
  teams,
  setSelectedTeams,
  selectedTeams,
}: {
  teams: Array<SingleTeamType>;
  selectedTeams: Array<number>;
  setSelectedTeams: React.Dispatch<React.SetStateAction<Array<number>>>;
}) {
  return (
    <div className="grid grid-cols-3 content-start gap-2 overflow-auto ">
      {teams.map((team) => {
        const { teamId, teamName, teamLeader, teamMembers } = team;

        const teamLeadName = teamLeader[0].userName;
        const noOfMembers = teamMembers.length + teamLeader.length;

        function handleSelectTeam() {
          setSelectedTeams((currentSelectedTeams) => {
            const isAlreadySelected = currentSelectedTeams.some(
              (selectedTeam) => selectedTeam === teamId,
            );

            if (isAlreadySelected) {
              return currentSelectedTeams.filter(
                (selectedTeam) => selectedTeam !== teamId,
              );
            }
            return [...currentSelectedTeams, teamId];
          });
        }

        return (
          <div
            key={"dialog" + String(teamId)}
            className={twMerge(
              "space-y-2 rounded-md border-2 border-transparent bg-gray-100 p-2 dark:bg-gray-500 dark:text-white",
              selectedTeams.some((selectedTeam) => selectedTeam === teamId) &&
                " border-lavender-500 bg-lavender-100",
            )}
            onClick={handleSelectTeam}
          >
            <p>{teamName}</p>
            <p>Leader: {teamLeadName}</p>
            <p>Members: {noOfMembers}</p>
          </div>
        );
      })}
    </div>
  );
}
export default TeamsList;
