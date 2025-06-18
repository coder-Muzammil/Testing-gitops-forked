import React, { useState, LegacyRef } from "react";
import { FaChevronDown, FaDatabase } from "react-icons/fa";
import { IconType } from "react-icons";
import { useClickAway } from "@uidotdev/usehooks";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";
export type Option = {
  id?: number;
  value: string | number;
  label: string;
};

type CustomSelectProps = {
  options: Array<Option>;
  placeholder?: string;
  PlaceholderIcon?: IconType;
};

const IdentitySelectionDropDown: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  PlaceholderIcon = FaDatabase,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickAway(() => {
    setIsOpen(false);
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get("identity");

  const handleOptionClick = (option: Option) => {
    console.log({ option });

    setSearchParams((currentParams) => {
      currentParams.set("identity", String(option.value));
      return currentParams;
    });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full " ref={ref as LegacyRef<HTMLDivElement>}>
      <div
        className={twMerge(
          "flex h-6 cursor-pointer items-center justify-between rounded-md border bg-white px-4 py-2 dark:bg-gray-700 2xl:h-8",
          isOpen && "border-fuchsia-700",
        )}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center">
          <PlaceholderIcon className="mr-2 text-gray-500" />
          {selectedOption ? (
            <span>
              {selectedOption === "all_unknown"
                ? "All Unknown"
                : selectedOption === "all_known"
                  ? "All Known"
                  : selectedOption === "all_data" && "All Data"}
            </span>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <FaChevronDown
          className={twMerge(
            "transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </div>
      <div
        className={twMerge(
          "absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg transition-all duration-300 dark:bg-gray-700",
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {options.map((option) => (
          <div
            key={option.label}
            className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              handleOptionClick(option);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdentitySelectionDropDown;
