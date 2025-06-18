import DropdownSingleSelect, {
  DropdownSingleSelectOptionsType,
} from "../../primitives/DropdownSingleSelect";
import useManageMosaic from "../../../stores/useManageMosaic";
import { MosaicSizeType } from "../../../stores/useManageMosaic.types";
import FullBrowserScreenButton from "./FullBrowserScreenButton";
import FullScreenButton from "./FullScreenButton";
import PlaylistSelector from "../LiveTv/PlaylistSelector";
import { mosaicSizes } from "../../../utils/constants";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import MastershotButton from "./MastershotButton";

function ConfigurationBar({
  setIsBrowserFullScreen,
  isBrowserFullScreen,
}: {
  setIsBrowserFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isBrowserFullScreen: boolean;
}) {
  const { mosaicSize, selectedPlaylistName, setMosaicSize, overWriteChannels } =
    useManageMosaic();

  function MosaicSizeTypeGuard(size: number): size is MosaicSizeType {
    return size >= 3 && size <= 8;
  }

  function handleSetMosaicSize(size: DropdownSingleSelectOptionsType) {
    if (!size) {
      return;
    }

    const selectedSize = +size.value || 3;

    if (!MosaicSizeTypeGuard(selectedSize)) {
      return;
    }

    setMosaicSize(selectedSize);
  }

  function getSelectedMosaicSize() {
    if (Number(mosaicSize) < 3 || Number(mosaicSize) > 8) {
      return mosaicSizes[0];
    }

    return (
      mosaicSizes.find((size) => size.value === Number(mosaicSize)) ??
      mosaicSizes[0]
    );
  }

  function handleOverwrite(channels: Array<SingleChannelType>) {
    overWriteChannels(channels);
  }

  return (
    <div className="flex w-full items-center justify-between rounded-md bg-white py-1 dark:bg-gray-900">
      <p className="px-2 text-lg">
        {selectedPlaylistName && (
          <>
            <span className="me-1 text-lavender-400">Playlist Name:</span>
            {selectedPlaylistName}
          </>
        )}
      </p>

      <div className="flex items-center gap-4 pr-4">
        <MastershotButton />
        <FullScreenButton elementName="mosaic-grid" />
        <FullBrowserScreenButton
          setIsBrowserFullScreen={setIsBrowserFullScreen}
          isBrowserFullScreen={isBrowserFullScreen}
        />

        <PlaylistSelector overWriteChannels={handleOverwrite} />
        <DropdownSingleSelect
          placeholderText="Select Mosaic Size"
          selectedOption={getSelectedMosaicSize()}
          handleSetOption={handleSetMosaicSize}
          entries={mosaicSizes}
        />
      </div>
    </div>
  );
}
export default ConfigurationBar;
