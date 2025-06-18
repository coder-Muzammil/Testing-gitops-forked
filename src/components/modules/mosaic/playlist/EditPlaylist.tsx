import { useClickAway } from "@uidotdev/usehooks";
import { MutableRefObject, useState } from "react";
import MultiChannelSelect from "./MultiChannelSelect";
import useGetAllChannels from "../../../../api/useGetAllChannels";
import useUpdatePlaylist from "../../../../api/useUpdatePlaylist";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const EditPlaylist = ({
  playlistId,
  setPlaylistId,
  playlistChannelsIds,
  setPlaylistChannelsIds,
}: {
  playlistId: number;
  setPlaylistId: React.Dispatch<React.SetStateAction<number | null>>;
  playlistChannelsIds: Array<number>;
  setPlaylistChannelsIds: React.Dispatch<React.SetStateAction<Array<number>>>;
}) => {
  const queryClient = useQueryClient();
  const { data: channelsList } = useGetAllChannels();
  const { mutate: updatePlaylist, isPending } = useUpdatePlaylist();
  const [selectedChannelsList, setSelectedChannelsList] =
    useState<Array<number>>(playlistChannelsIds);

  const ref = useClickAway(() => {
    setPlaylistId(null);
    setPlaylistChannelsIds([]);
  });

  const updataPlaylistChannels = () => {
    updatePlaylist(
      {
        playlistId,
        channelsIds: selectedChannelsList,
      },
      {
        onSuccess: () => {
          toast.success("Playlist channels updated.");
          queryClient
            .invalidateQueries({ queryKey: ["playlists"] })
            .then(() => {
              setPlaylistId(null);
              setPlaylistChannelsIds([]);
            })
            .catch((error: unknown) => {
              console.error("Error invalidating queries:", error);
            });
        },
        onError: () => {
          toast.error("Server Error");
        },
      },
    );
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div
        ref={ref as MutableRefObject<HTMLDivElement>}
        className="h-fit w-[400px] space-y-2 rounded-md bg-white px-2 py-4 dark:bg-gray-800"
      >
        <p className="rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-fuchsia-600">
          Update PlayList Channnels
        </p>

        <div className="my-3 flex flex-col gap-2">
          <MultiChannelSelect
            channelsList={channelsList}
            selectedChannelsList={selectedChannelsList}
            setSelectedChannelsList={setSelectedChannelsList}
          />
        </div>
        <div className="flex items-center justify-center gap-2 py-2">
          <button
            onClick={updataPlaylistChannels}
            disabled={isPending}
            className="rounded-md bg-gray-100 px-3 py-1 text-center text-sm text-fuchsia-400 hover:bg-gray-200 disabled:cursor-not-allowed"
          >
            {isPending ? "Updating..." : "Update Playlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylist;
