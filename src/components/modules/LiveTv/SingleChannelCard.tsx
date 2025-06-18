// import { verifyResourceUrl } from "../../../utils/helpers";
import generalImagePlaceholder from "../../../assets/placeholder.jpg";
import logoPlaceholder from "../../../assets/images.png";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import toast from "react-hot-toast";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import { RiPlayListAddLine } from "react-icons/ri";
import { useState } from "react";
import AddChannelToPlaylistModal from "../playlist/AddChannelToPlaylistModal";
import ViewConfigurationsModal from "./ViewConfigurationsModal";
import { FcDataConfiguration } from "react-icons/fc";

function SingleChannelCard({ channel }: { channel: SingleChannelType }) {
  const { id, logo, name, poster, isLive, playlists } = channel;
  const { addChannel } = useManageLiveTv();
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [isOpenConfigModal, setIsOpenConfigModal] = useState(false);

  function addThisChannel() {
    if (!isLive) {
      toast.success(
        "This channel is not live right now due to some reason but you can view recorded data.",
      );
    }
    addChannel(channel);
  }

  function handleOpenAddToPlaylistModal(
    e: React.MouseEvent<HTMLButtonElement>,
  ) {
    e.stopPropagation();

    setIsAddToPlaylistModalOpen(true);
  }

  return (
    <div key={id}>
      <div
        className="relative space-y-2 overflow-hidden rounded-xl"
        title="Click to play"
        onClick={addThisChannel}
      >
        <img
          // src={verifyResourceUrl(poster, generalImagePlaceholder)}
          src={poster ?? generalImagePlaceholder}
          alt=""
          className="aspect-video w-full rounded-xl object-cover"
        />

        <div className="grid grid-cols-[auto_1fr_auto] items-center justify-items-start gap-2">
          <img
            // src={verifyResourceUrl(logo, logoPlaceholder)}
            src={logo ?? logoPlaceholder}
            alt={name}
            className="aspect-square w-10 rounded-full object-cover"
          />
          <p>{name}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenConfigModal(true);
            }}
            className="text-sm font-medium text-lavender-600 underline"
            title="View configurators"
          >
            <FcDataConfiguration size={24} cursor="pointer" />
          </button>
        </div>

        <button
          className="absolute right-2 top-0 rounded-md bg-white/40 p-1 text-xl hover:bg-white/70"
          type="button"
          title="Add to playlist"
          onClick={handleOpenAddToPlaylistModal}
        >
          <RiPlayListAddLine />
        </button>
      </div>
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

      {isOpenConfigModal && (
        <ViewConfigurationsModal
          channelId={id}
          channelName={name}
          closeModal={() => {
            setIsOpenConfigModal(false);
          }}
        />
      )}
    </div>
  );
}

export default SingleChannelCard;
