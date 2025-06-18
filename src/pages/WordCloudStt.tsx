import { useState } from "react";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import Titlebar from "../components/modules/WordcloudStt/Titlebar";
import { twMerge } from "tailwind-merge";
import SMMHeader from "../components/modules/WordcloudStt/ComponentSMM/SMMHeader";
import SMMCloud from "../components/modules/WordcloudStt/ComponentSMM/SMMCloud";

function WordCloudStt() {
  const [isBrowserFullScreen, setIsBrowserFullScreen] = useState(false);

  return (
    <OutletMainContainer>
      <div className="grid grid-rows-[auto_1fr]">
        <SMMHeader />
        {/* <FiltersbarWordCloud /> */}
        <div
          id="wordcloudContainer"
          className={twMerge(
            "relative grid  grid-rows-[auto_auto] overflow-auto bg-white dark:bg-gray-800 ",
            isBrowserFullScreen && "fixed inset-0 z-50 bg-white",
          )}
        >
          <Titlebar
            isFullscreen={isBrowserFullScreen}
            setIsFullscreen={setIsBrowserFullScreen}
          />

          <SMMCloud />
          {/* <Cloud /> */}
        </div>
      </div>
    </OutletMainContainer>
  );
}
export default WordCloudStt;
