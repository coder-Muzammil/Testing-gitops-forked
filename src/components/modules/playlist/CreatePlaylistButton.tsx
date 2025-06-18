import { useState } from "react";
import CreatePlaylistModal from "./CreatePlaylistModal";

export function CreatePlaylistButton() {
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  function closeModal() {
    setIsPlaylistModalOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsPlaylistModalOpen(true);
        }}
        className="text-sm font-semibold text-black dark:text-white"
      >
        Create Playlist
      </button>
      {isPlaylistModalOpen && <CreatePlaylistModal closeModalFn={closeModal} />}
    </>
  );
}
