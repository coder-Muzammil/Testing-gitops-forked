import DropdownSingleSelect, {
  DropdownSingleSelectOptionsType,
} from "../../primitives/DropdownSingleSelect";
import MultipleChannelsSelectionDropDown from "../FaceTrack/FRMultipleSelectionsDropDown";

const entries = [
  {
    label: "Default",
    value: 0,
  },
  {
    label: "Top 5",
    value: 5,
  },
];

const SelectableFilters = ({
  selectedEntry,
  setSelectedEntry,
}: {
  selectedEntry: DropdownSingleSelectOptionsType;
  setSelectedEntry: React.Dispatch<
    React.SetStateAction<DropdownSingleSelectOptionsType>
  >;
}) => {
  function handleSetOption(entry: DropdownSingleSelectOptionsType) {
    if (!entry?.value) {
      setSelectedEntry(null);
    } else {
      setSelectedEntry(entry);
    }
  }

  return (
    <div className="flex w-full items-start justify-start gap-2">
      <div className="flex-1">
        <MultipleChannelsSelectionDropDown />
      </div>
      <div className="w-48">
        <DropdownSingleSelect
          placeholderText="Select Top Channels"
          entries={entries}
          selectedOption={selectedEntry}
          handleSetOption={handleSetOption}
        />
      </div>
    </div>
  );
};

export default SelectableFilters;
