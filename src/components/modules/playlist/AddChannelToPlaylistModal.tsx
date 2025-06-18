import Portal from "../../primitives/Portal";
import FixedInsetZeroDiv from "../../primitives/FixedInsetZeroDiv";
import useGetPlaylists from "../../../api/useGetPlaylists";
import { SinglePlaylistRecordType } from "../../../api/useGetPlaylists.types";
import { useState } from "react";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import useAddChannelToPlaylist from "../../../api/useAddChannelToPlaylist";
import { useClickAway } from "@uidotdev/usehooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CreatePlaylistButton } from "./CreatePlaylistButton";

function AddChannelToPlaylistModal({
  channel: { channelName, channelId, currentPlaylistIds },
  closeModal,
}: {
  channel: {
    channelId: number;
    channelName: string;
    currentPlaylistIds: Array<number>;
  };
  closeModal: () => void;
}) {
  const {
    data: playlists,
    isError: isGetPlaylistError,
    error,
  } = useGetPlaylists();

  const [selectedLists, setSelectedLists] =
    useState<Array<number>>(currentPlaylistIds);

  const ref = useClickAway(() => {
    closeModal();
  });

  const queryClient = useQueryClient();

  const {
    mutate: AddThisChannelToPlaylist,
    isPending,
    isError,
  } = useAddChannelToPlaylist();

  function handleAddChannelToPlaylist() {
    AddThisChannelToPlaylist(
      {
        playlistIds: selectedLists,
        channelId: channelId,
      },
      {
        onSuccess: () => {
          toast.success(`${channelName} playlists updated`);

          queryClient
            .invalidateQueries({
              queryKey: ["getAllChannels"],
            })
            .catch((err: unknown) => {
              console.log(err);
            });

          queryClient.removeQueries({
            queryKey: ["playlists"],
          });

          closeModal();
        },
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            toast.error(error.message);
          }
        },
      },
    );
  }

  return (
    <Portal>
      <FixedInsetZeroDiv>
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="grid max-h-[80vh] w-[500px] grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white px-3 py-3 dark:bg-gray-700"
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            <div className="flex items-center justify-between ">
              <p className="select-none font-semibold text-lavender-500">
                Add {channelName} to playlists
              </p>
              <div className="w-[60px]">
                <ButtonGradientPrimary
                  type="button"
                  onClick={handleAddChannelToPlaylist}
                  isLoading={isPending}
                  isInvalid={isError}
                >
                  <span>Save</span>
                </ButtonGradientPrimary>
              </div>
            </div>
            <div className="flex justify-center">
              <CreatePlaylistButton />
            </div>
            {!isGetPlaylistError && (
              <PlaylistChecklist
                playlists={playlists ?? []}
                selectedLists={selectedLists}
                setSelectedLists={setSelectedLists}
              />
            )}
            {isGetPlaylistError && (
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

export default AddChannelToPlaylistModal;

function PlaylistChecklist({
  playlists,
  selectedLists,
  setSelectedLists,
}: {
  playlists: Array<SinglePlaylistRecordType>;
  selectedLists: Array<number>;
  setSelectedLists: (selectedLists: Array<number>) => void;
}) {
  return (
    <div className="space-y-2 overflow-auto">
      {playlists.map((playlist) => {
        const { id, channels, playlistName } = playlist;

        const noOfChannels = channels.length;

        function handlePlaylistClick() {
          if (isThisSelected) {
            setSelectedLists(selectedLists.filter((listId) => listId !== id));
          } else {
            setSelectedLists([...selectedLists, id]);
          }
        }

        const isThisSelected = selectedLists.some(
          (selectedListId) => selectedListId === id,
        );

        return (
          <div key={id} className="px-3">
            <label
              className="flex items-center rounded-sm bg-gray-200 px-3 py-2 text-gray-800 transition-all hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-500"
              htmlFor={String(id)}
            >
              <input
                type="checkbox"
                id={String(id)}
                className="mr-2"
                checked={isThisSelected}
                onChange={handlePlaylistClick}
              />
              {playlistName}{" "}
              <span className="text-sm text-gray-700">({noOfChannels})</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
