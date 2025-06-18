import { FaDatabase } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MultiSelect, { PersonsOption } from "../../uiComponents/MultiSelect";
import useGetAllTrainedPersons from "../../../api/useGetAllTrainedPersons";
import SingleDateRangePicker from "./SingleDateRangePicker";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { personsOptions } from "../../../utils/constants";
import TimeSelectionField from "../LiveStt/TimeSelectionField";
import IdentitySelectionDropDown from "./IdenetitySelectionDropDown";
import MultipleChannelsSelectionDropDown from "../Tickers/MultipleChannelsSelectionDropDown";

type PersonsType = Array<{
  value: number;
  label: string;
}>;

export default function FaceTrackHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPersonsOptions, setSelectedPersonsOptions] = useState<
    Array<PersonsOption>
  >([]);

  const { data } = useGetAllTrainedPersons();
  let persons: PersonsType = [];
  if (data) {
    persons = data.map((item) => ({
      value: item.id,
      label: item.personName,
    }));
  }

  const startDate = searchParams.get("startDate");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const identity = searchParams.get("identity");

  const areFiltersNotEmpty = (): boolean => {
    return (
      identity !== "" ||
      startTime !== "" ||
      endTime !== "" ||
      startDate !== "" ||
      selectedPersonsOptions.length !== 0
    );
  };
  console.log(areFiltersNotEmpty());
  const handleClearFilters = (): void => {
    searchParams.delete("startTime");
    searchParams.delete("endTime");
    searchParams.delete("identity");
    searchParams.delete("persons");
    searchParams.delete("channel");
    searchParams.delete("startDate");
    setSelectedPersonsOptions([]);
  };

  useEffect(() => {
    const selectedPersons = selectedPersonsOptions
      .map((option) => String(option.value))
      .join(",");

    setSearchParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (selectedPersonsOptions.length > 0) {
        newParams.set("persons", selectedPersons);
      } else {
        newParams.delete("persons");
      }
      return newParams;
    });
  }, [selectedPersonsOptions, setSearchParams]);

  return (
    <header className=" grid grid-rows-[auto_1fr] gap-4 ">
      <div className="mt-4 flex items-center justify-around gap-4">
        <SingleDateRangePicker />
        <TimeSelectionField slug="startTime" />
        <TimeSelectionField slug="endTime" />
      </div>
      <div className=" mt-4 grid grid-cols-3 gap-4">
        <MultiSelect
          options={persons}
          selectedOptions={selectedPersonsOptions}
          onChange={setSelectedPersonsOptions}
          placeholder="Select Persons"
        />
        <IdentitySelectionDropDown
          options={personsOptions}
          placeholder="Filter by identity"
          PlaceholderIcon={FaDatabase}
        />
        <MultipleChannelsSelectionDropDown />
        {/* <MultipleChannelsSelectionDropDown /> */}
      </div>
      <div className="flex items-center justify-end">
        <button
          title="Clear Filters"
          onClick={handleClearFilters}
          disabled={areFiltersNotEmpty() ? false : true}
          className="cursor-pointer rounded-full  bg-lavender-500 p-[6px] disabled:cursor-not-allowed  disabled:bg-gray-300 disabled:text-gray-400"
        >
          <MdOutlineFilterAltOff size={24} />
        </button>
      </div>
    </header>
  );
}
