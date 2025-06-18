import { twMerge } from "tailwind-merge";
import useManageMosaic from "../../../stores/useManageMosaic";
import MosaicTile from "./MosaicTile";
import { RiFullscreenExitLine } from "react-icons/ri";

function MosaicGrid({
  isBrowserFullScreen,
  setIsBrowserFullScreen,
}: {
  isBrowserFullScreen: boolean;
  setIsBrowserFullScreen: (value: boolean) => void;
}) {
  const { mosaicSize, selectedChannels } = useManageMosaic();

  return (
    <div
      id="mosaic-grid"
      className={twMerge(
        "relative grid h-full w-full gap-0.5 overflow-auto transition-all",
        isBrowserFullScreen && "fixed inset-0 z-50 bg-white",
      )}
      style={{
        gridTemplateColumns: `repeat(${String(mosaicSize)} , 1fr)`,
        gridTemplateRows: `repeat(${String(mosaicSize)} , 1fr)`,
      }}
    >
      {Array.from({ length: mosaicSize * mosaicSize }).map((_, index) => {
        const channel = selectedChannels[index];

        return <MosaicTile key={index} channel={channel} index={index} />;
      })}

      {isBrowserFullScreen && (
        <button
          type="button"
          onClick={() => {
            setIsBrowserFullScreen(false);
          }}
          className="absolute right-2 top-2 z-20 rounded-md bg-white p-1 dark:bg-slate-500"
        >
          <RiFullscreenExitLine />
        </button>
      )}
    </div>
  );
}

export default MosaicGrid;
