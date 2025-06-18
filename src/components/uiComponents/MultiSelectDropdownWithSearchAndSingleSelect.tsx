import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";

type EnhancedDropdownProps = {
  list: Array<DropdownProps>;
  selectedList: Array<string>;
  inputHeight?: number;
  handleCheckboxChange: (isChecked: boolean, value: string) => void;
  handleSingleSelectClick: (value: string) => void;
  maxHeightDropdown?: string;
};

function MultiSelectDropdownWithSearchAndSingleSelect(
  props: EnhancedDropdownProps,
) {
  const {
    inputHeight = 30,
    list,
    handleCheckboxChange,
    handleSingleSelectClick,
    selectedList,
    maxHeightDropdown = "200px",
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const filteredList = list.filter(({ name }) => {
    return name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div
      className="relative grid w-full grid-cols-[auto_1fr] "
      style={{
        height: inputHeight,
      }}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="flex h-full items-center justify-center rounded-l-md bg-lavender-500 px-2 text-sm text-white ">
        {selectedList.length === 0 || selectedList.length === list.length - 1
          ? " All "
          : selectedList.length}
        <p className="mx-1">Channels</p>
      </div>
      <div
        className=""
        onFocus={() => {
          setIsOpen(true);
        }}
      >
        <input
          type="search"
          name="search"
          id="search-dropdown"
          className="h-full w-full rounded-r-md border border-lavender-500 px-2 text-gray-500 placeholder:text-sm focus-within:outline-none dark:bg-gray-700 dark:text-white"
          autoComplete="off"
          placeholder="Search"
          value={query}
          onChange={(ev) => {
            setQuery(ev.target.value);
          }}
        />

        {isOpen && (
          <Dropdown
            length={list.length}
            handleCheckboxChange={handleCheckboxChange}
            handleSingleSelectClick={handleSingleSelectClick}
            selectedList={selectedList}
            filteredList={filteredList}
            maxHeightDropdown={maxHeightDropdown}
          />
        )}
      </div>
    </div>
  );
}

export default MultiSelectDropdownWithSearchAndSingleSelect;

type DropdownComponentProps = {
  length: number;
  filteredList: Array<{ name: string; value: string }>;
  selectedList: Array<string>;
  handleCheckboxChange: (isChecked: boolean, value: string) => void;
  handleSingleSelectClick: (value: string) => void;
  maxHeightDropdown: string;
};

function Dropdown(props: DropdownComponentProps) {
  const { maxHeightDropdown } = props;

  return (
    <div
      className="absolute inset-x-0 z-10 space-y-2 overflow-auto rounded-b-md border border-t-0 bg-gray-100 py-3 dark:bg-gray-800"
      style={{
        maxHeight: maxHeightDropdown,
      }}
    >
      {props.filteredList.map((item, index) => {
        const { name, value } = item;
        return (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                name={value}
                id={value}
                checked={
                  value === "all"
                    ? props.selectedList.length === props.length - 1
                    : props.selectedList.includes(value)
                }
                onChange={(ev) => {
                  props.handleCheckboxChange(ev.target.checked, value);
                }}
              />
              {name}
            </label>
            <div>
              <button
                type="button"
                className="block aspect-square w-4 rounded-full bg-gray-300 text-gray-500 hover:bg-gray-400"
                onClick={() => {
                  props.handleSingleSelectClick(value);
                }}
              ></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
