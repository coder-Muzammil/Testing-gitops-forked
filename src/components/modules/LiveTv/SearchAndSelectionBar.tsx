import DropdownSingleSelect, {
  DropdownSingleSelectOptionsType,
} from "../../primitives/DropdownSingleSelect";
import ChannelSelectionBar from "./ChannelSelectionBar";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import PlaylistSelector from "./PlaylistSelector";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import CreateConfigurationButton from "./CreateConfigurationButton";

const entries = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Local",
    value: "local",
  },
  {
    label: "International",
    value: "international",
  },
];

type DropdownSingleSelectOptionsWithoutNull = Exclude<
  DropdownSingleSelectOptionsType,
  null
>;

function SearchAndSelectionBar({
  selectedEntry,
  setSelectedEntry,
}: {
  selectedEntry: DropdownSingleSelectOptionsWithoutNull;
  setSelectedEntry: React.Dispatch<
    React.SetStateAction<DropdownSingleSelectOptionsWithoutNull>
  >;
}) {
  const { selectedChannels, overWriteChannels } = useManageLiveTv();

  const noOfChannels = selectedChannels.length;

  const labelText = `${String(noOfChannels)} selected`;

  function handleSetOption(entry: DropdownSingleSelectOptionsType) {
    if (!entry?.value) return;
    if (entry.value === selectedEntry.value) return;

    setSelectedEntry(entry);
  }

  function handleOverwrite(channels: Array<SingleChannelType>) {
    overWriteChannels(channels);
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2">
      {/* TODO: make it type generic */}

      <DropdownSingleSelect
        placeholderText="Select Channel Type"
        entries={entries}
        selectedOption={selectedEntry}
        handleSetOption={handleSetOption}
      />

      <ChannelSelectionBar label={labelText} selectedEntry={selectedEntry} />
      <PlaylistSelector overWriteChannels={handleOverwrite} />
      <CreateConfigurationButton />
    </div>
  );
}
export default SearchAndSelectionBar;
