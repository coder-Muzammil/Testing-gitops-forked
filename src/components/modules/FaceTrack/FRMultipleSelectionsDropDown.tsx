import MultipleSelectionsDropDown from "../../primitives/MultipleSelectionsDropDown";
import { useSearchParams } from "react-router-dom";
import useGetAllChannels from "../../../api/useGetAllChannels";

const MultipleChannelsSelectionDropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useGetAllChannels();
  const channelsEntries = data
    ?.filter((item) => item.isFRActivated)
    .map((entry) => ({
      label: entry.name,
      value: entry.id,
    }));

  const channels = searchParams.get("channel")?.split(",") ?? [];

  const handleOptionsSelection = (channelValue: string) => {
    let newSelectedChannels: Array<string>;

    if (channelValue === "") {
      if (channels.length === channelsEntries?.length) {
        return;
      } else {
        newSelectedChannels =
          channelsEntries?.map((entry) => String(entry.value)) ?? [];
      }
    } else {
      if (channels.includes(channelValue)) {
        if (channels.length === 1) {
          return;
        }

        newSelectedChannels = channels.filter(
          (value) => value !== channelValue,
        );
      } else {
        newSelectedChannels = [...channels, channelValue];
      }
    }

    if (newSelectedChannels.length === channelsEntries?.length) {
      newSelectedChannels = channelsEntries.map((entry) => String(entry.value));
    }

    setSearchParams((currentParams) => {
      if (newSelectedChannels.length === 0) {
        currentParams.delete("channel");
      } else {
        currentParams.set("channel", newSelectedChannels.join(","));
      }
      return currentParams;
    });
  };

  return (
    <>
      <MultipleSelectionsDropDown
        placeholderText="All"
        selectedOptions={channels}
        handleOptionsSelection={handleOptionsSelection}
        entries={[{ label: "All", value: "" }, ...(channelsEntries ?? [])]}
      />
    </>
  );
};

export default MultipleChannelsSelectionDropDown;
