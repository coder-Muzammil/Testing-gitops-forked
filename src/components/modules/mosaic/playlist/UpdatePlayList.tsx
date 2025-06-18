import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import useGetPlaylists from "../../../../api/useGetPlaylists";
import useDeletePlaylist from "../../../../api/useDeletePlaylist";
import toast from "react-hot-toast";
import EditPlaylist from "./EditPlaylist";
import { useClickAway } from "@uidotdev/usehooks";

const UpdatePlayList = () => {
  const { data, isLoading, isError, error } = useGetPlaylists();
  const { mutate: deletePlaylist, isPending } = useDeletePlaylist();
  const [isExpended, setIsExpanded] = useState(false);
  const [playlistId, setPlaylistId] = useState<number | null>(null);
  const [playlistChannelIds, setPlaylistChannelsIds] = useState<Array<number>>(
    [],
  );

  const ref = useClickAway(() => {
    setIsExpanded(false);
  });

  const handleDeletePlaylist = (id: number) => {
    deletePlaylist(id, {
      onSuccess: () => {
        toast.success("Playlist deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete playlist");
      },
    });
  };

  return (
    <div
      ref={ref as React.LegacyRef<HTMLDivElement>}
      className={twMerge(
        "absolute bottom-1 right-1 w-52 gap-2 rounded-md bg-white px-2 py-1 shadow-sm shadow-gray-500",
        isExpended && "grid h-[calc(100%-6%)] grid-rows-[auto_1fr]",
      )}
    >
      <div
        className={twMerge(
          "flex items-center justify-between gap-2 px-1 py-1",
          isExpended && "mb-3 rounded border-b border-gray-900/20",
        )}
      >
        <span className="text-sm font-semibold text-fuchsia-600">
          Mosaic Playlists
        </span>{" "}
        <button
          onClick={() => {
            setIsExpanded(!isExpended);
          }}
        >
          {isExpended ? (
            <FaAngleDown size={18} cursor="pointer" />
          ) : (
            <FaAngleUp size={18} cursor="pointer" />
          )}
        </button>
      </div>

      {isExpended && (
        <div className="flex flex-col gap-1 overflow-auto">
          {isLoading && (
            <p className="text-center text-sm font-semibold text-fuchsia-700">
              Loading...
            </p>
          )}
          {isError && (
            <p className="text-center text-sm font-semibold text-red-500">
              {error.message}
            </p>
          )}
          {data ? (
            data.map((item) => {
              return (
                <div
                  key={item.id}
                  className={twMerge(
                    "mr-1 flex items-center justify-between gap-2 rounded-md bg-gray-100 px-2 py-2",
                    isPending && "cursor-not-allowed",
                  )}
                >
                  <span className="text-sm font-semibold capitalize text-gray-600">
                    {`${item.playlistName}(${String(item.channels.length)})`}
                  </span>
                  <span className="flex items-center justify-end gap-2 text-fuchsia-700">
                    <FaRegEdit
                      onClick={() => {
                        setPlaylistId(item.id);
                        setPlaylistChannelsIds(
                          item.channels.map((channel) => channel.id),
                        );
                      }}
                      size={14}
                      cursor="pointer"
                    />

                    <RiDeleteBin6Line
                      onClick={() => {
                        handleDeletePlaylist(item.id);
                      }}
                      size={14}
                      cursor="pointer"
                      className="disabled:cursor-not-allowed"
                    />
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm font-semibold text-fuchsia-700">
              No playlist found.
            </p>
          )}
        </div>
      )}

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
};

export default UpdatePlayList;
