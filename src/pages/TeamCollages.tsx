import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import Collages from "../components/modules/Collages/Collages";
import SearchbarSearchParams from "../components/modules/MyClips/SearchbarSearchParams";

const TeamCollages = () => {
  return (
    <OutletMainContainer>
      <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-5 overflow-hidden  pr-3">
        <h1 className="text-center text-xl font-bold tracking-wider text-lavender-500 underline ">
          Team Collages
        </h1>
        <div className="w-1/3">
          <SearchbarSearchParams />
        </div>
        <div className="overflow-y-auto">
          <Collages myTeamCollages={true} />
        </div>
      </div>
    </OutletMainContainer>
  );
};

export default TeamCollages;
