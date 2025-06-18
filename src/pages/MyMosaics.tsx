import CollagesHeader from "../components/modules/Collages/CollagesHeader";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import Mosaics from "../components/modules/mosaic/Mosaics";

const MyMosaics = () => {
  return (
    <OutletMainContainer>
      <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_1fr] gap-5 overflow-hidden  pr-3">
        <CollagesHeader />
        <Mosaics myTeamMosaics={false} />
      </div>
    </OutletMainContainer>
  );
};

export default MyMosaics;
