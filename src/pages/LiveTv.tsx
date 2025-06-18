import PlayingChannels from "../components/modules/LiveTv/PlayingChannels";
import AllChannels from "../components/modules/LiveTv/AllChannels";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import { useManageLiveTv } from "../stores/useManageLiveTv";
import SearchAndSelectionBar from "../components/modules/LiveTv/SearchAndSelectionBar";
import { useState } from "react";

function LiveTv() {
  const [selectedEntry, setSelectedEntry] = useState<{
    label: string | number;
    value: string | number;
  }>({
    label: "All",
    value: "all",
  });
  const { selectedChannels } = useManageLiveTv();

  const noChannels = selectedChannels.length === 0;

  return (
    <OutletMainContainer>
      <div className=" grid grid-rows-[auto_1fr]  gap-2 px-4">
        <SearchAndSelectionBar
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
        <div className="hide-scrollbar   overflow-auto ">
          {!noChannels && <PlayingChannels />}
          {noChannels && <AllChannels selectedEntry={selectedEntry} />}
        </div>
      </div>
    </OutletMainContainer>
  );
}
export default LiveTv;
