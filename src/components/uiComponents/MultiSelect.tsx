import { useClickAway } from "@uidotdev/usehooks";
import React, { useState, useEffect, LegacyRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";

export type PersonsOption = {
  value: number | string;
  label: string;
};

type MultiSelectProps = {
  options: Array<PersonsOption>;
  selectedOptions: Array<PersonsOption>;
  onChange: (selected: Array<PersonsOption>) => void;
  placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder,
}) => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [isAllKnownIdentity, setIsAllKnownIdentity] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] =
    useState<Array<PersonsOption>>(options);
  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const identity = searchParams.get("identity");

  useEffect(() => {
    if (identity === "all_unknown") {
      setIsAllKnownIdentity(true);
    } else {
      setIsAllKnownIdentity(false);
    }
  }, [identity]);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(filter.toLowerCase()),
      ),
    );
  }, [filter, options]);

  const handleSelect = (option: PersonsOption) => {
    if (selectedOptions.find((o) => o.value === option.value)) {
      onChange(selectedOptions.filter((o) => o.value !== option.value));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative w-full " ref={ref as LegacyRef<HTMLDivElement>}>
      <div
        className={twMerge(
          "flex h-6 items-center justify-between rounded border bg-white p-2 transition-opacity dark:bg-gray-700 2xl:h-8",
          isOpen && "border-fuchsia-700",
          isAllKnownIdentity && "cursor-not-allowed opacity-50",
        )}
        onClick={(e) => {
          if (!isAllKnownIdentity) {
            setIsOpen(!isOpen);
          }
          e.stopPropagation();
        }}
      >
        <div className="flex flex-wrap">
          {selectedOptions.length > 0 ? (
            <span>{selectedOptions.length} selected</span>
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
          "absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white transition-all duration-300 dark:bg-gray-700",
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          className="w-full border-b border-gray-300 p-2 dark:bg-gray-700"
          placeholder="Search..."
        />
        <div className="max-h-40 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer p-2 hover:bg-gray-300  ${
                selectedOptions.find((o) => o.value === option.value)
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() => {
                handleSelect(option);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
