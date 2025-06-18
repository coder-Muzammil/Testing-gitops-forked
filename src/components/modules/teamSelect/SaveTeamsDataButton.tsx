import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";

function SaveTeamsDataButton({
  isPending,
  selectedTeams,
  handleShareInTeams,
}: {
  isPending: boolean;
  selectedTeams: Array<number>;
  handleShareInTeams: () => void;
}) {
  const noOfSelectedTeams = selectedTeams.length;

  return (
    <div className="w-24">
      <ButtonGradientPrimary
        type="button"
        onClick={handleShareInTeams}
        isLoading={isPending}
        disabled={isPending}
      >
        <div className="flex items-center justify-center gap-2">
          Save
          <span className="rounded-sm bg-white p-0.5 text-xs text-lavender-600">
            {noOfSelectedTeams}
          </span>
        </div>
      </ButtonGradientPrimary>
    </div>
  );
}
export default SaveTeamsDataButton;
