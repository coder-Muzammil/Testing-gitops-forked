import { useClickAway } from "@uidotdev/usehooks";
import { LegacyRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export type DropdownSingleSelectOptionsType = {
  label: string | number;
  value: string | number;
} | null;

function DropdownSingleSelect({
  placeholderText,
  entries,
  selectedOption,
  handleSetOption,
}: {
  placeholderText: string;
  entries: Array<DropdownSingleSelectOptionsType>;
  selectedOption: DropdownSingleSelectOptionsType;
  handleSetOption: (entry: DropdownSingleSelectOptionsType) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const widthOfBiggestLabel = entries.reduce((acc, entry) => {
    if (!entry) return acc;

    const label = entry.label.toString();
    return label.length > acc ? label.length : acc;
  }, 0);

  return (
    <button
      className="relative flex h-6 w-full items-center justify-between rounded-md border border-lavender-500 bg-white px-3 text-xs text-lavender-700 shadow-md dark:bg-gray-700 dark:text-white 2xl:h-8 2xl:text-sm"
      style={{
        minWidth: `${String(widthOfBiggestLabel)}ch`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => {
          return !prev;
        });
      }}
      ref={ref as LegacyRef<HTMLButtonElement>}
    >
      <span>{selectedOption?.label ?? placeholderText}</span>
      <FaAngleDown className="" />
      <DropDownMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedEntry={selectedOption}
        entries={entries}
        setSelectedEntry={handleSetOption}
      />
    </button>
  );
}
export default DropdownSingleSelect;

function DropDownMenu({
  isOpen,
  setIsOpen,
  selectedEntry,
  entries,
  setSelectedEntry,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedEntry: DropdownSingleSelectOptionsType;
  entries: Array<DropdownSingleSelectOptionsType>;
  setSelectedEntry: (entry: DropdownSingleSelectOptionsType) => void;
}) {
  function handleIsOpen() {
    setIsOpen(false);
  }

  return (
    <div
      className={twMerge(
        "absolute left-0 right-0 top-[calc(100%_+_0.25rem)] z-10 max-h-[40vh]  overflow-auto rounded-md bg-white shadow dark:bg-gray-700",
        isOpen && "border border-lavender-300",
      )}
    >
      <div
        className={twMerge(
          "grid grid-cols-1 transition-all",
          !isOpen && "grid-rows-[0fr]",
          isOpen && "grid-rows-[1fr]",
        )}
      >
        <ul className="space-y-0.5 overflow-hidden text-left">
          {entries.map((entry) => (
            <li
              key={entry?.value}
              className={twMerge(
                "rounded-md px-3 py-1 text-xs hover:bg-lavender-300 dark:hover:bg-gray-600 2xl:py-2 ",
                selectedEntry === entry && "bg-gray-100 dark:bg-gray-600",
              )}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEntry(entry);

                handleIsOpen();
              }}
            >
              {entry?.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
