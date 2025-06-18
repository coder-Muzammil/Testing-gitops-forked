import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";

import SttLiveContextComponent from "../components/modules/LiveStt/SttLiveContextComponent";
import StarPlayerContextComponent from "../components/modules/StarPlayer/StarPlayerContextComponent";
import PlayTimeHeader from "../components/modules/PlayTime/PlayTimeHeader";
import useGetHeadlinesNewsData from "../api/useGetHeadlinesNewsData";
import NewsGptAndPlayTimeContent from "../components/modules/PlayTime/NewsGptAndPlayTimeContent";
import { useState } from "react";

const PlayTime = () => {
  const [selectedChannels, setSelectedChannels] = useState<
    Array<Array<string>>
  >([]);

  const [selectedTimeList, setSelectedTimeList] = useState<string>("");
  const [headlineTitle, setHeadlineTitle] = useState<Array<string>>([]);
  const {
    data: headlinesTimeInterval,
    isLoading: isHeadlinesLoading,
    isError: isHeadlinesError,
    error: headlinesError,
  } = useGetHeadlinesNewsData({
    selectedChannels,
    selectedTimeList,
    headlineTitle,
  });
  return (
    <OutletMainContainer>
      <SttLiveContextComponent>
        <StarPlayerContextComponent>
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <PlayTimeHeader
              headlinesTimeInterval={headlinesTimeInterval}
              setSelectedChannels={setSelectedChannels}
              setSelectedTimeList={setSelectedTimeList}
              setHeadlineTitle={setHeadlineTitle}
              selectedChannels={selectedChannels}
            />
            <NewsGptAndPlayTimeContent
              data={headlinesTimeInterval}
              isLoading={isHeadlinesLoading}
              isError={isHeadlinesError}
              error={headlinesError}
            />
          </div>
        </StarPlayerContextComponent>
      </SttLiveContextComponent>
    </OutletMainContainer>
  );
};

export default PlayTime;
