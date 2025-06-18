import { MutableRefObject, useState } from "react";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import AddButtonMosaicTile from "./AddButtonMosaicTile";
import CloseButtonMosaicTile from "./CloseButtonMosaicTile";
import BasicLivePlayer from "../BasicLivePlayer";
import { twMerge } from "tailwind-merge";
import ChannelPicker from "./ChannelPicker";
import { useClickAway } from "@uidotdev/usehooks";

function MosaicTile({
  channel,
  index,
}: {
  channel: SingleChannelType | null;
  index: number;
}) {
  // const [channels, setChannel] = useState<SingleChannelType | null>(null);

  const [isChannelSelectionModalOpen, setIsChannelSelectionModalOpen] =
    useState(false);

  const ref = useClickAway(() => {
    setIsChannelSelectionModalOpen(false);
  });

  return (
    <div
      className={twMerge(
        "group relative overflow-hidden bg-lavender-400 hover:bg-lavender-500 dark:bg-gray-800 dark:hover:bg-gray-900",
        channel && "bg-black hover:bg-black",
      )}
    >
      {!channel && (
        <AddButtonMosaicTile
          setIsChannelSelectionModalOpen={setIsChannelSelectionModalOpen}
        />
      )}

      {channel && (
        <p className="invisible absolute right-2 top-2 text-sm text-white group-hover:visible">
          {channel.name}
        </p>
      )}

      {channel && <CloseButtonMosaicTile channelId={channel.id} />}
      {channel && (
        <div className="h-full w-full">
          <BasicLivePlayer src={channel.liveLink} id={channel.id} />
        </div>
      )}
      {/* {isChannelSelectionModalOpen && (
        <MosaicPlayListModal
          setIsChannelSelectionModalOpen={setIsChannelSelectionModalOpen}
        />
      )} */}
      {isChannelSelectionModalOpen && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div
            className="space-y-2 rounded-md bg-white px-6 py-4 dark:bg-gray-700"
            ref={ref as MutableRefObject<HTMLDivElement>}
          >
            <ChannelPicker
              setIsChannelSelectionModalOpen={setIsChannelSelectionModalOpen}
              channelIndex={index}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default MosaicTile;
