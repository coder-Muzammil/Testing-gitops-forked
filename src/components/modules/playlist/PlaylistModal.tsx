import Portal from "../../primitives/Portal";
import FixedInsetZeroDiv from "../../primitives/FixedInsetZeroDiv";
import useGetPlaylists from "../../../api/useGetPlaylists";
import { useClickAway } from "@uidotdev/usehooks";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import { CreatePlaylistButton } from "./CreatePlaylistButton";
import Playlists from "./Playlists";

function PlaylistModal({
  setIsPlaylistModalOpen,
  overWriteChannels,
}: {
  setIsPlaylistModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  overWriteChannels: (channels: Array<SingleChannelType>) => void;
}) {
  const { data: playlists, isError, error } = useGetPlaylists();
  const ref = useClickAway(closeModal);

  function closeModal() {
    setIsPlaylistModalOpen(false);
  }

  return (
    <Portal>
      <FixedInsetZeroDiv>
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="grid max-h-[80vh] w-[500px] grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white px-3 py-3 dark:bg-gray-700"
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            <div className="flex items-center justify-between">
              <p className="select-none font-semibold text-lavender-500">
                Select Playlist
              </p>
              <CreatePlaylistButton />
            </div>
            {!isError && (
              <Playlists
                playlists={playlists ?? []}
                closeModalFn={closeModal}
                overWriteChannels={overWriteChannels}
              />
            )}
            {isError && (
              <div>
                <p className="text-center">{error.message}</p>
              </div>
            )}
          </div>
        </div>
      </FixedInsetZeroDiv>
    </Portal>
  );
}

export default PlaylistModal;
