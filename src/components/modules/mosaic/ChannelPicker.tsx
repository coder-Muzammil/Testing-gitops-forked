import useGetAllChannels from "../../../api/useGetAllChannels";
import DropdownSingleSelect from "../../primitives/DropdownSingleSelect";
import { DropdownSingleSelectOptionsType } from "../../primitives/DropdownSingleSelect";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import { useState } from "react";
import useManageMosaic from "../../../stores/useManageMosaic";
function ChannelPicker({
  setIsChannelSelectionModalOpen,
  channelIndex,
}: {
  setIsChannelSelectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channelIndex: number;
}) {
  const { data, isLoading, isError } = useGetAllChannels();
  const [selectedChannel, setSelectedChannel] =
    useState<SingleChannelType | null>(null);
  const { addChannelAtIndex } = useManageMosaic();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const entries: Array<DropdownSingleSelectOptionsType> =
    data?.map((channel) => ({
      label: channel.name,
      value: channel.id,
    })) ?? [];

  function handleSetSelectedChannel(
    selectedChannel: DropdownSingleSelectOptionsType,
  ) {
    const channel = data?.find(
      (channel) => channel.id === selectedChannel?.value,
    );

    if (channel) {
      setSelectedChannel(channel);
    }
  }

  return (
    <>
      <DropdownSingleSelect
        placeholderText="Select a channel"
        selectedOption={{
          label: selectedChannel?.name ?? "Select a channel",
          value: selectedChannel?.id ?? "",
        }}
        handleSetOption={handleSetSelectedChannel}
        entries={entries}
      />
      <div className="grid grid-cols-1 gap-2">
        <ButtonGradientPrimary
          type="button"
          disabled={selectedChannel === null}
          onClick={() => {
            if (selectedChannel) {
              addChannelAtIndex(selectedChannel, channelIndex);
              setIsChannelSelectionModalOpen(false);
            }
          }}
        >
          Add
        </ButtonGradientPrimary>
      </div>
    </>
  );
}
export default ChannelPicker;
