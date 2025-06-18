import { useState } from "react";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import useCreatePlaylist from "../../../api/useCreatePlaylist";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Input from "../../primitives/Input";
import useGetAllChannels from "../../../api/useGetAllChannels";
import MultiChannelSelect from "../mosaic/playlist/MultiChannelSelect";

function CreatePlaylistModal({ closeModalFn }: { closeModalFn: () => void }) {
  const [playlistName, setPlaylistName] = useState("");
  const { mutate: createPlaylist, isError, isPending } = useCreatePlaylist();
  const queryClient = useQueryClient();
  const { data: channelsList } = useGetAllChannels();
  const [selectedChannelsList, setSelectedChannelsList] = useState<
    Array<number>
  >([]);

  let errMessage = "";

  if (isError && axios.isAxiosError(isError)) {
    errMessage = "Error creating playlist";
  }

  function handlePlaylistSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (playlistName.trim() === "") {
      return;
    }
    createPlaylist(
      { playlistName, channelIds: selectedChannelsList },
      {
        onSuccess: () => {
          setPlaylistName("");
          queryClient
            .invalidateQueries({
              queryKey: ["playlists"],
            })
            .catch((err: unknown) => {
              console.error(err);
            });
          toast.success("Playlist created successfully");
          closeModalFn();
        },
        onError: (err: unknown) => {
          if (axios.isAxiosError(err)) {
            setPlaylistName("");

            toast.error(err.message);
          }
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <form
        className="space-y-2 rounded-md bg-white px-3 py-3 dark:bg-gray-700"
        onSubmit={handlePlaylistSubmit}
      >
        <div className="flex w-full justify-end">
          <button
            type="button"
            className="rounded-md border border-transparent px-1 py-1 text-sm transition-all hover:border-lavender-500 dark:text-white dark:hover:border-lavender-600"
            onClick={closeModalFn}
          >
            close
          </button>
        </div>
        <Input
          value={playlistName}
          placeholder="Playlist Name"
          id="playlistName"
          type="text"
          onChange={(e) => {
            setPlaylistName(e.target.value);
          }}
          required
        />
        <p className="text-sm font-semibold text-gray-600 dark:text-white">
          Select Channels
        </p>
        <div className="flex max-h-[300px] flex-col gap-1 overflow-auto ">
          <MultiChannelSelect
            channelsList={channelsList}
            selectedChannelsList={selectedChannelsList}
            setSelectedChannelsList={setSelectedChannelsList}
          />
        </div>
        <ButtonGradientPrimary type="submit" isLoading={isPending}>
          <span className="px-1 text-sm dark:text-white">Create Playlist</span>
        </ButtonGradientPrimary>
        <p
          className={twMerge(
            "invisible text-sm text-red-500",
            isError && "visible ",
          )}
        >
          {errMessage}
        </p>
      </form>
    </div>
  );
}

export default CreatePlaylistModal;
