import React from "react";
import { useSearchParams } from "react-router-dom";

const SingleDateRangePicker: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((currentParams) => {
      currentParams.set("startDate", e.target.value);
      return currentParams;
    });
  };
  const selectedDate = searchParams.get("startDate");

  return (
    <div className="flex w-full flex-col gap-2">
      <input
        type="date"
        id="date-picker"
        value={selectedDate ?? ""}
        onChange={handleDateChange}
        className=" h-8 cursor-pointer rounded-md border-2 border-gray-300 px-3 text-sm shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
        style={{ minWidth: "300px" }}
      />
    </div>
  );
};

export default SingleDateRangePicker;
