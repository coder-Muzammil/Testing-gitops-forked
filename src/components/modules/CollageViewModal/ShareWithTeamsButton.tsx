import { LiaShareAltSolid } from "react-icons/lia";
import SelectTeamsModal from "../teamSelect/SelectTeamsModal";
import { useState } from "react";
import { TeamEntitiesType } from "../../../utils/typeDefinations";

function ShareWithTeamsButton({
  itemId,
  entityType,
}: {
  itemId: number;
  entityType: TeamEntitiesType;
}) {
  const [isTeamSelectionModalOpen, setIsTeamSelectionModalOpen] =
    useState(false);

  function handleOpenTeamsModal() {
    setIsTeamSelectionModalOpen(true);
  }

  function handleCloseTeamsModal() {
    setIsTeamSelectionModalOpen(false);
  }

  return (
    <div>
      <button
        className="btnClass dark:bg-gray-500 dark:text-gray-200"
        title="Share with teams"
        onClick={handleOpenTeamsModal}
      >
        <div className="flex items-center gap-2 text-xs">
          Teams
          <div className="text-sm 2xl:text-base">
            <LiaShareAltSolid />
          </div>
        </div>
      </button>

      {isTeamSelectionModalOpen && (
        <SelectTeamsModal
          entityType={entityType}
          itemId={itemId}
          closerFn={handleCloseTeamsModal}
        />
      )}
    </div>
  );
}
export default ShareWithTeamsButton;
