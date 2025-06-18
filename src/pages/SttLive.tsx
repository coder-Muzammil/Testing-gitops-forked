import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import LiveSttBody from "../components/modules/LiveStt/LiveSttBody";
import TopFiltersBar from "../components/modules/LiveStt/TopFiltersBar";
import SttLiveContextComponent from "../components/modules/LiveStt/SttLiveContextComponent";
import StarPlayerContextComponent from "../components/modules/StarPlayer/StarPlayerContextComponent";
import DictionaryContextComponent from "../components/modules/SttUploadNew/DictionaryContextComponent";

const SttLive = () => {
  return (
    <OutletMainContainer>
      <SttLiveContextComponent>
        <StarPlayerContextComponent>
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <DictionaryContextComponent>
              <TopFiltersBar />
            </DictionaryContextComponent>
            <LiveSttBody />
          </div>
        </StarPlayerContextComponent>
      </SttLiveContextComponent>
    </OutletMainContainer>
  );
};

export default SttLive;
