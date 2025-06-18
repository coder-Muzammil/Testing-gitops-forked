import CollagesHeader from "../components/modules/Collages/CollagesHeader";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import Collages from "../components/modules/Collages/Collages";

const MyCollages = () => {
  return (
    <OutletMainContainer>
      <div className="grid h-full w-full grid-rows-[auto_1fr] gap-5 overflow-hidden pr-3">
        <CollagesHeader />
        <Collages myTeamCollages={false} />
      </div>
    </OutletMainContainer>
  );
};

export default MyCollages;
