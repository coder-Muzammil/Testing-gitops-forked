import { useClickAway } from "@uidotdev/usehooks";
import { useState, LegacyRef, useEffect } from "react";

type DropDownOptionsType = {
  label: string | number;
  value: string | number;
} | null;

const MultipleChnnelSelectionBarSearch = ({
  placeholderText,
  setSelectedOptions,
  selectedOptions,
  entries,
}: {
  placeholderText: string;
  setSelectedOptions: (selectedChannels: Array<string>) => void;
  selectedOptions: Array<string>;
  entries: Array<DropDownOptionsType>;
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredChannels, setFilteredChannels] = useState(entries);

  useEffect(() => {
    setSelectedOptions(selectedOptions);
  }, [selectedOptions, setSelectedOptions]);

  useEffect(() => {
    const filtered = entries.filter(
      (channel) =>
        channel &&
        String(channel.label).toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredChannels(filtered);
  }, [search, entries]);

  const handleOptionsSelection = (channelValue: string) => {
    let newSelectedChannels: Array<string>;

    if (selectedOptions.length === entries.length) {
      if (selectedOptions.includes(channelValue)) {
        newSelectedChannels = selectedOptions.filter(
          (value) => value !== channelValue,
        );
      } else {
        newSelectedChannels = [channelValue];
      }
    } else {
      if (selectedOptions.includes(channelValue)) {
        newSelectedChannels = selectedOptions.filter(
          (value) => value !== channelValue,
        );
      } else {
        newSelectedChannels = [...selectedOptions, channelValue];
      }
    }

    setSelectedOptions(newSelectedChannels);
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === entries.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(entries.map((channel) => String(channel?.value)));
    }
  };

  const isAllSelected = selectedOptions.length === entries.length;

  const ref = useClickAway(() => {
    setShowDropDown(false);
  });

  return (
    <div
      className="relative flex w-full items-center justify-between rounded-md border"
      onClick={() => {
        setShowDropDown(!showDropDown);
      }}
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
    >
      <div className="flex flex-row px-3">
        <p>
          {selectedOptions.length && selectedOptions.length !== entries.length
            ? selectedOptions.length
            : placeholderText}
        </p>
      </div>

      {showDropDown && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-7 z-10 max-h-60 w-full overflow-y-auto border bg-white p-1 shadow-md"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectedOptions.length == 0 ? true : isAllSelected}
              onChange={handleSelectAll}
            />
            <label htmlFor="selectAll">All</label>
          </div>
          {(filteredChannels.length > 0 ? filteredChannels : entries).map(
            (channel) => (
              <div key={channel?.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={String(channel?.value)}
                  checked={
                    selectedOptions.includes(String(channel?.value)) ||
                    selectedOptions.length == 0
                      ? true
                      : false
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
      <input
        type="text"
        name=""
        id=""
        className="w-[70%] rounded border border-purple-500 outline-none"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default MultipleChnnelSelectionBarSearch;
