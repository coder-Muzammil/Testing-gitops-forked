import { useState } from "react";
import { useLivePlayerContext } from "../../../hooks/useLivePlayerContext";
import AddChannelToPlaylistModal from "../playlist/AddChannelToPlaylistModal";
import { RiPlayListAddLine } from "react-icons/ri";

function AddToPlaylistButton() {
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const {
    channel: { id, name, playlists },
  } = useLivePlayerContext();

  function handleOpenAddToPlaylistModal(
    e: React.MouseEvent<HTMLButtonElement>,
  ) {
    e.stopPropagation();

    setIsAddToPlaylistModalOpen(true);
  }

  return (
    <div>
      <button
        className="rounded-md p-1 text-xl text-white"
        type="button"
        title="Add to playlist"
        onClick={handleOpenAddToPlaylistModal}
      >
        <RiPlayListAddLine />
      </button>
      {isAddToPlaylistModalOpen && (
        <AddChannelToPlaylistModal
          channel={{
            channelId: id,
            channelName: name,
            currentPlaylistIds: playlists,
          }}
          closeModal={() => {
            setIsAddToPlaylistModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default AddToPlaylistButton;
