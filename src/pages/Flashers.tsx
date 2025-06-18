import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import FlashersDataTable from "../components/modules/flashers/FlashersDataTable";
import FlashersContextComponent from "../components/modules/flashers/FlashersContextComponent";
import FlashersHeader from "../components/modules/flashers/FlashersHeader";
import StarPlayerContextComponent from "../components/modules/StarPlayer/StarPlayerContextComponent";

function Flashers() {
  return (
    <OutletMainContainer>
      <FlashersContextComponent>
        <StarPlayerContextComponent>
          <div className="grid grid-rows-[auto_1fr] gap-2">
            <FlashersHeader />
            <FlashersDataTable />
          </div>
        </StarPlayerContextComponent>
      </FlashersContextComponent>
    </OutletMainContainer>
  );
}
export default Flashers;
