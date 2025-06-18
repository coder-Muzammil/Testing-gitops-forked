import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import { useState } from "react";
import PlaylistModal from "../playlist/PlaylistModal";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";

function PlaylistSelector({
  overWriteChannels,
}: {
  overWriteChannels: (channels: Array<SingleChannelType>) => void;
}) {
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  return (
    <div>
      <ButtonGradientPrimary
        type="button"
        onClick={() => {
          setIsPlaylistModalOpen(true);
        }}
      >
        <span className="px-3">Playlists</span>
      </ButtonGradientPrimary>
      {isPlaylistModalOpen && (
        <PlaylistModal
          setIsPlaylistModalOpen={setIsPlaylistModalOpen}
          overWriteChannels={overWriteChannels}
        />
      )}
    </div>
  );
}

export default PlaylistSelector;
