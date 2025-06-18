import { Dispatch, SetStateAction } from "react";
import { SingleChannelType } from "../../../../api/responseTypes/getAllChannelsApi.types";

const MultiChannelSelect = ({
  channelsList,
  selectedChannelsList,
  setSelectedChannelsList,
}: {
  channelsList?: Array<SingleChannelType>;
  selectedChannelsList: Array<number>;
  setSelectedChannelsList: Dispatch<SetStateAction<Array<number>>>;
}) => {
  // Check if all channels are selected
  const areAllChannelsSelected =
    channelsList && selectedChannelsList.length === channelsList.length;

  // Handle "Select All" click
  const handleSelectAllClick = () => {
    if (areAllChannelsSelected) {
      // Deselect all channels
      setSelectedChannelsList([]);
    } else if (channelsList) {
      // Select all channels
      setSelectedChannelsList(channelsList.map((channel) => channel.id));
    }
  };

  return (
    <div className="max-h-[350px] overflow-auto">
      {channelsList ? (
        <>
          <div className="">
            <label
              className="flex items-center justify-start rounded-sm px-3 py-2 text-gray-800 transition-all hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600"
              htmlFor="select-all"
            >
              <input
                type="checkbox"
                id="select-all"
                className="mr-2"
                checked={areAllChannelsSelected}
                onChange={handleSelectAllClick}
              />
              <span className="text-sm capitalize text-gray-700 dark:text-white">
                Select All
              </span>
            </label>
          </div>

          {/* Channel List */}
          {channelsList.map((channel) => {
            const { id, name } = channel;

            function handleSelectChannelListClick() {
              if (isThisChannelSelected) {
                setSelectedChannelsList(
                  selectedChannelsList.filter((listId) => listId !== id),
                );
              } else {
                setSelectedChannelsList([...selectedChannelsList, id]);
              }
            }

            const isThisChannelSelected = selectedChannelsList.includes(id);

            return (
              <div key={id}>
                <label
                  className="flex items-center justify-start rounded-sm px-3 py-2 text-gray-800 transition-all hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600"
                  htmlFor={String(id)}
                >
                  <input
                    type="checkbox"
                    id={String(id)}
                    className="mr-2"
                    checked={isThisChannelSelected}
                    onChange={handleSelectChannelListClick}
                  />
                  <span className="text-sm capitalize text-gray-700 dark:text-white">
                    {name}
                  </span>
                </label>
              </div>
            );
          })}
        </>
      ) : (
        <p className="w-full text-center font-semibold text-fuchsia-600">
          Loading...
        </p>
      )}
    </div>
  );
};

export default MultiChannelSelect;
