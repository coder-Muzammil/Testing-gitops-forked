import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import useGetAllChannels from "../../../api/useGetAllChannels";
import MultiSelectDropdownWithSearchAndSingleSelect from "../../uiComponents/MultiSelectDropdownWithSearchAndSingleSelect";
import { useSearchParams } from "react-router-dom";
type Props = {
  channelFilter?: (channel: SingleChannelType) => boolean;
};

function MultipleChannelsSelectionDropDown({ channelFilter }: Props) {
  const { data: channels } = useGetAllChannels();

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedChannelsList = searchParams.get("channel")
    ? searchParams.get("channel")?.split(",") ?? []
    : [];
  console.log("channelfilter", channelFilter);
  const filteredList =
    channels
      ?.filter((channel) => (channelFilter ? channelFilter(channel) : true))
      .map((channel) => ({
        name: channel.name,
        value: String(channel.id),
      })) ?? [];
  function handleCheckboxChange(isChecked: boolean, value: string) {
    const newParams = new URLSearchParams(searchParams);
    let updatedChannels = [...selectedChannelsList];

    if (value === "all") {
      updatedChannels = isChecked ? filteredList.map(({ value }) => value) : [];
    } else {
      updatedChannels = isChecked
        ? [...updatedChannels, value]
        : updatedChannels.filter((channel) => channel !== value);
    }

    if (updatedChannels.length > 0) {
      newParams.set("channel", updatedChannels.join(","));
    } else {
      newParams.delete("channel");
    }

    setSearchParams(newParams);
  }

  function handleSingleSelectClick(value: string) {
    const newParams = new URLSearchParams(searchParams);

    if (value === "all") {
      const updatedChannels = filteredList.map(({ value }) => value);
      newParams.set("channel", updatedChannels.join(","));
    } else {
      newParams.set("channel", value);
    }

    if (!newParams.get("channel")) {
      newParams.delete("channel");
    }

    setSearchParams(newParams);
  }

  return (
    <MultiSelectDropdownWithSearchAndSingleSelect
      list={[{ name: "All", value: "all" }, ...filteredList]}
      selectedList={selectedChannelsList}
      handleCheckboxChange={handleCheckboxChange}
      handleSingleSelectClick={handleSingleSelectClick}
      maxHeightDropdown="50vh"
    />
  );
}

export default MultipleChannelsSelectionDropDown;
