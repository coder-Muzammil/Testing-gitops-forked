import { useClickAway } from "@uidotdev/usehooks";
import { Dispatch, LegacyRef, SetStateAction, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

function SelectLanguageDropDown({
  disabled,
  entries,
  selectedEntry,
  setSelectedEntry,
}: {
  disabled?: boolean;
  entries: Array<"urdu" | "english">;
  selectedEntry: "urdu" | "english";
  setSelectedEntry: Dispatch<SetStateAction<"urdu" | "english">>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  return (
    <button
      disabled={disabled}
      className="relative flex h-6 w-36 items-center justify-between rounded-md border border-fuchsia-600 bg-fuchsia-50 px-3 text-xs text-fuchsia-700 disabled:cursor-not-allowed disabled:text-gray-400 2xl:h-8 2xl:w-48 2xl:text-sm"
      onClick={() => {
        setIsOpen((prev) => {
          return !prev;
        });
      }}
      ref={ref as LegacyRef<HTMLButtonElement>}
    >
      <span>{selectedEntry}</span>
      <FaAngleDown className="" />
      <DropDownMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedEntry={selectedEntry}
        entries={entries}
        setSelectedEntry={setSelectedEntry}
      />
    </button>
  );
}
export default SelectLanguageDropDown;

function DropDownMenu({
  isOpen,
  setIsOpen,
  selectedEntry,
  entries,
  setSelectedEntry,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedEntry: "urdu" | "english";
  entries: Array<"urdu" | "english">;
  setSelectedEntry: Dispatch<SetStateAction<"urdu" | "english">>;
}) {
  function handleIsOpen() {
    setIsOpen(false);
  }

  return (
    <div
      className={twMerge(
        "absolute left-0 right-0 top-[calc(100%_+_0.25rem)] z-10 rounded-md  bg-white shadow",
        isOpen && "border border-fuchsia-300",
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
              key={entry}
              className={twMerge(
                "rounded-md px-3 py-1 text-xs hover:bg-fuchsia-100 2xl:py-2",
                selectedEntry === entry && "bg-gray-100",
              )}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEntry(entry);

                handleIsOpen();
              }}
            >
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
