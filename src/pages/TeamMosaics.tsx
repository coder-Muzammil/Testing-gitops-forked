import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import SearchbarSearchParams from "../components/modules/MyClips/SearchbarSearchParams";
import Mosaics from "../components/modules/mosaic/Mosaics";

const TeamMosaics = () => {
  return (
    <OutletMainContainer>
      <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-5 overflow-hidden  pr-3">
        <h1 className="text-center text-xl font-bold tracking-wider text-lavender-500 underline ">
          Team Flashers
        </h1>
        <div className="w-1/3">
          <SearchbarSearchParams />
        </div>
        <div className="gap-2 overflow-y-auto">
          <Mosaics myTeamMosaics={true} />
        </div>
      </div>
    </OutletMainContainer>
  );
};

export default TeamMosaics;
