import { useState } from "react";
import { SinglePlaylistRecordType } from "../../../api/useGetPlaylists.types";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import useManageMosaic from "../../../stores/useManageMosaic";
import useDeletePlaylist from "../../../api/useDeletePlaylist";
import toast from "react-hot-toast";
import { getMosaicSize } from "../../../utils/helpers";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditPlaylist from "../mosaic/playlist/EditPlaylist";
import { QueryClient } from "@tanstack/react-query";

export default function Playlists({
  playlists,
  closeModalFn,
  overWriteChannels,
}: {
  playlists: Array<SinglePlaylistRecordType>;
  closeModalFn: () => void;
  overWriteChannels: (channels: Array<SingleChannelType>) => void;
}) {
  const queryClient = new QueryClient();
  const { setSelectedPlaylistName, setMosaicSize } = useManageMosaic();
  const { mutate: deletePlaylist, isPending } = useDeletePlaylist();
  const [playlistId, setPlaylistId] = useState<number | null>(null);
  const [playlistChannelIds, setPlaylistChannelsIds] = useState<Array<number>>(
    [],
  );

  const handleDeletePlaylist = (id: number) => {
    deletePlaylist(id, {
      onSuccess: () => {
        toast.success("Playlist deleted successfully");
        queryClient
          .invalidateQueries({ queryKey: ["playlists"] })
          .then(() => {
            console.log("Queries invalidated successfully");
          })
          .catch((error: unknown) => {
            console.error("Error invalidating queries:", error);
          });
      },
      onError: () => {
        toast.error("Failed to delete playlist");
      },
    });
  };

  return (
    <div className="space-y-2 overflow-auto">
      {playlists.map((playlist) => {
        const { id, channels, playlistName } = playlist;

        const noOfChannels = channels.length;

        function handlePlaylistClick() {
          if (noOfChannels === 0) {
            toast.error("No channels in this playlist");
            return;
          }
          setSelectedPlaylistName(playlistName);
          const mosaicValue = getMosaicSize(channels.length);
          setMosaicSize(mosaicValue);
          overWriteChannels(channels);
          closeModalFn();
        }

        return (
          <div key={id} className="px-3">
            <div className="flex items-center justify-between gap-3 rounded-sm bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-400">
              <span
                className="flex-1 text-gray-800"
                onClick={handlePlaylistClick}
                role="button"
              >
                {playlistName}
                <span className="text-sm text-gray-700">({noOfChannels})</span>
              </span>
              <span
                aria-disabled={isPending}
                className="flex items-center justify-end gap-3 text-fuchsia-700"
              >
                <FaRegEdit
                  onClick={() => {
                    setPlaylistId(id);
                    setPlaylistChannelsIds(
                      channels.map((channel) => channel.id),
                    );
                  }}
                  className="size-4 cursor-pointer disabled:cursor-not-allowed"
                />

                <RiDeleteBin6Line
                  onClick={() => {
                    handleDeletePlaylist(id);
                  }}
                  aria-disabled={isPending}
                  className="size-4 cursor-pointer disabled:cursor-not-allowed"
                />
              </span>
            </div>
          </div>
        );
      })}

      {playlistId && (
        <EditPlaylist
          playlistId={playlistId}
          setPlaylistId={setPlaylistId}
          playlistChannelsIds={playlistChannelIds}
          setPlaylistChannelsIds={setPlaylistChannelsIds}
        />
      )}
    </div>
  );
}
