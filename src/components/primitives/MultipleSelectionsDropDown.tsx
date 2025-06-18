import { useClickAway } from "@uidotdev/usehooks";
import { useState, LegacyRef, useEffect } from "react";
import LabeledInputField from "../uiComponents/LabeledInputField";

type DropDownOptionsType = {
  label: string | number;
  value: string | number;
} | null;

const MultipleSelectionsDropDown = ({
  slug,
  placeholderText,
  handleOptionsSelection,
  selectedOptions,
  entries,
}: {
  slug?: string | undefined;
  placeholderText: string;
  selectedOptions: Array<string>;
  handleOptionsSelection: (channelValue: string) => void;
  entries: Array<DropDownOptionsType>;
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredChannels, setFilteredChannels] = useState(entries);

  useEffect(() => {
    const filtered = entries.filter(
      (channel) =>
        channel &&
        String(channel.label).toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredChannels(filtered);
  }, [search, entries]);

  const ref = useClickAway(() => {
    setShowDropDown(false);
  });

  const isAllSelected = selectedOptions.length === entries.length - 1; // Exclude "All"
  const noOfSelectedChannels =
    isAllSelected || selectedOptions.length === 0
      ? "All"
      : selectedOptions.length;
  const labelText = `${String(noOfSelectedChannels)} ${slug ?? ""}`;

  return (
    <div
      className="relative h-8 items-center justify-center rounded-md"
      onClick={() => {
        setShowDropDown(!showDropDown);
      }}
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
    >
      <LabeledInputField
        type="search"
        label={labelText}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder={placeholderText}
      />
      {showDropDown && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-7 z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white  p-1 shadow-md dark:bg-gray-700 dark:text-white/80"
        >
          {(filteredChannels.length > 0 ? filteredChannels : entries).map(
            (channel) => (
              <div key={channel?.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={String(channel?.value)}
                  checked={
                    channel?.value === ""
                      ? isAllSelected
                      : selectedOptions.includes(String(channel?.value))
                  }
                  onChange={() => {
                    handleOptionsSelection(String(channel?.value));
                  }}
                />
                <label htmlFor={String(channel?.value)}>
                  {String(channel?.label)}
                </label>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default MultipleSelectionsDropDown;
