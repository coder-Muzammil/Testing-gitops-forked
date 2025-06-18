import { useState } from "react";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import ConfigurationBar from "../components/modules/mosaic/ConfigurationBar";
import MosaicGrid from "../components/modules/mosaic/MosaicGrid";

function Mosaic() {
  const [isBrowserFullScreen, setIsBrowserFullScreen] = useState(false);
  return (
    <OutletMainContainer>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-2">
        <ConfigurationBar
          setIsBrowserFullScreen={setIsBrowserFullScreen}
          isBrowserFullScreen={isBrowserFullScreen}
        />
        <MosaicGrid
          isBrowserFullScreen={isBrowserFullScreen}
          setIsBrowserFullScreen={setIsBrowserFullScreen}
        />
        {/* <UpdatePlayList /> */}
      </div>
    </OutletMainContainer>
  );
}
export default Mosaic;
