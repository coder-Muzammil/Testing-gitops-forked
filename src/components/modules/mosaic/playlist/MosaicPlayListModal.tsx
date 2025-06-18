import { useClickAway } from "@uidotdev/usehooks";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import DropdownSingleSelect, {
  DropdownSingleSelectOptionsType,
} from "../../../primitives/DropdownSingleSelect";
import useManageMosaic from "../../../../stores/useManageMosaic";
import { MosaicSizeType } from "../../../../stores/useManageMosaic.types";
import useGetAllChannels from "../../../../api/useGetAllChannels";
import { SingleChannelType } from "../../../../api/responseTypes/getAllChannelsApi.types";
import usePostMultiChannelsSelectPlayList from "../../../../api/usePostMultiChannelsSelectPlayList";
import { mosaicSizes } from "../../../../utils/constants";

const MosaicPlayListModal = ({
  setIsChannelSelectionModalOpen,
}: {
  setIsChannelSelectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const { data: playlists, isLoading } = useGetPlaylists();
  const { data: channelsList } = useGetAllChannels();
  const { mutate: multiSelectMutate } = usePostMultiChannelsSelectPlayList();
  const { mosaicSize, setMosaicSize } = useManageMosaic();

  const [playListName, setPlayListName] = useState<string>("");
  const [selectedLists, setSelectedLists] = useState<Array<number>>([]);
  const [selectedChannelsList, setSelectedChannelsList] = useState<
    Array<number>
  >([]);
  const [isPlayListOptions, setIsPlayListOptions] = useState<boolean>(false);
  const [isChannelsOptions, setIsChannelsOptions] = useState<boolean>(false);

  const ref = useClickAway(() => {
    setIsChannelSelectionModalOpen(false);
    setPlayListName("");
    setSelectedChannelsList([]);
    setSelectedLists([]);
    setIsChannelsOptions(false);
    setIsPlayListOptions(false);
  });

  function MosaicSizeTypeGuard(size: number): size is MosaicSizeType {
    return size >= 3 && size <= 8;
  }

  function getSelectedMosaicSize() {
    if (Number(mosaicSize) < 3 || Number(mosaicSize) > 8) {
      return mosaicSizes[0];
    }

    return (
      mosaicSizes.find((size) => size.value === Number(mosaicSize)) ??
      mosaicSizes[0]
    );
  }

  function handleSetMosaicSize(size: DropdownSingleSelectOptionsType) {
    if (!size) {
      return;
    }

    const selectedSize = +size.value || 3;

    if (!MosaicSizeTypeGuard(selectedSize)) {
      return;
    }

    setMosaicSize(selectedSize);
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-[500px] space-y-2 rounded-md bg-white px-6 py-4"
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        {/* {isLoading && (
          <p className="text-xl font-semibold text-center text-fuchsia-400">
            Loading...
          </p>
        )} */}
        <h1 className="w-full text-center text-lg font-semibold text-fuchsia-400">
          {isChannelsOptions
            ? "Add Channels to Playlist"
            : "Select Playlist to Add Channels"}
        </h1>

        {/* {!isChannelsOptions && (
          <div className="h-fit max-h-[500px] overflow-y-auto">
            {!isChannelsOptions &&
              playlists?.map((playlist) => {
                const { id, channels, playlistName } = playlist;

                const noOfChannels = channels.length;

                function handlePlaylistClick() {
                  if (isThisSelected) {
                    setSelectedLists(
                      selectedLists.filter((listId) => listId !== id),
                    );
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
                      className="flex items-center justify-between px-3 py-2 text-gray-800 transition-all bg-gray-200 rounded-sm hover:bg-gray-300"
                      htmlFor={String(id)}
                    >
                      <span className="text-sm text-gray-700 capitalize">{`${playlistName} (${noOfChannels})`}</span>
                      <input
                        type="checkbox"
                        id={String(id)}
                        className="mr-2"
                        checked={isThisSelected}
                        onChange={handlePlaylistClick}
                      />
                    </label>
                  </div>
                );
              })}
          </div>
        )} */}

        {isPlayListOptions && !isChannelsOptions && (
          <>
            <div className="flex w-full flex-col gap-4 px-3 pt-3">
              <input
                type="text"
                placeholder="Enter Playlist Name"
                className="rounded-md border border-gray-400 px-3 py-1 text-sm font-normal placeholder:text-sm focus:border-fuchsia-900 focus:outline-none"
                value={playListName}
                onChange={(e) => {
                  setPlayListName(e.target.value);
                }}
              />

              <DropdownSingleSelect
                placeholderText="Select Mosaic Size"
                selectedOption={getSelectedMosaicSize()}
                handleSetOption={handleSetMosaicSize}
                entries={mosaicSizes}
              />
            </div>
            <div className="flex w-full justify-end gap-4 px-3 pt-2">
              <button
                onClick={() => {
                  setIsChannelsOptions(true);
                }}
                className="rounded-md bg-gray-100 px-3 py-1 text-center text-sm text-fuchsia-400"
              >
                Create
              </button>
            </div>
          </>
        )}

        {!isPlayListOptions && !isChannelsOptions && (
          <div className="flex w-full justify-end gap-4 px-3 pt-2">
            <button
              onClick={() => {
                setIsPlayListOptions(true);
              }}
              className="rounded-md bg-gray-100 px-3 py-1 text-center text-sm text-fuchsia-400"
            >
              Create New Playlist
            </button>
          </div>
        )}

        {isChannelsOptions && (
          <>
            <ChannelSelection
              channelsList={channelsList}
              selectedChannelsList={selectedChannelsList}
              setSelectedChannelsList={setSelectedChannelsList}
            />
            <div className="flex w-full justify-end gap-4 px-3 pt-2">
              <button
                onClick={() => {
                  console.log({
                    playListName,
                    selectedLists,
                    selectedChannelsList,
                  });

                  multiSelectMutate(
                    {
                      playListName,
                      playListIds: selectedLists,
                      channelsIds: selectedChannelsList,
                    },
                    {
                      onSuccess: () => {
                        toast.success(
                          "Successfully added channels to playlist",
                        );
                        setIsChannelSelectionModalOpen(false);
                        setPlayListName("");
                        setSelectedChannelsList([]);
                        setSelectedLists([]);
                        setIsChannelsOptions(false);
                        setIsPlayListOptions(false);
                      },
                      onError: () => {
                        toast.error("Api failed to add channels to playlist");
                      },
                    },
                  );
                }}
                className="rounded-md bg-gray-100 px-3 py-1 text-center text-sm text-fuchsia-400"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MosaicPlayListModal;

const ChannelSelection = ({
  channelsList,
  selectedChannelsList,
  setSelectedChannelsList,
}: {
  channelsList?: Array<SingleChannelType>;
  selectedChannelsList: Array<number>;
  setSelectedChannelsList: Dispatch<SetStateAction<Array<number>>>;
}) => {
  return (
    <div className="h-[500px] overflow-y-auto">
      {channelsList ? (
        channelsList.map((channel) => {
          const { id, name } = channel;
          function handleselectChannellistClick() {
            if (isThisChannelSelected) {
              setSelectedChannelsList(
                selectedChannelsList.filter((listId) => listId !== id),
              );
            } else {
              setSelectedChannelsList([...selectedChannelsList, id]);
            }
          }

          const isThisChannelSelected = selectedChannelsList.some(
            (selectedListId) => selectedListId === id,
          );

          return (
            <div key={id} className="px-3">
              <label
                className="flex items-center justify-between rounded-sm px-3 py-2 text-gray-800 transition-all hover:bg-gray-300"
                htmlFor={String(id)}
              >
                <span className="text-sm capitalize text-gray-700">{name}</span>
                <input
                  type="checkbox"
                  id={String(id)}
                  className="mr-2"
                  checked={isThisChannelSelected}
                  onChange={handleselectChannellistClick}
                />
              </label>
            </div>
          );
        })
      ) : (
        <p>Empty Channels List!</p>
      )}
    </div>
  );
};
