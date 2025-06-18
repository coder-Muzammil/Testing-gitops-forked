import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SingleDateInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${String(year)}-${month}-${day}`;
  };

  const [date, setDate] = useState(getCurrentDate());

  useEffect(() => {
    // Set the current date in search params on initial render
    searchParams.set("date", date);
    setSearchParams(searchParams);
  }, [date, searchParams, setSearchParams]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (selectedDate) {
      searchParams.set("date", selectedDate);
    } else {
      searchParams.delete("date");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        id="date"
        type="date"
        value={date}
        onChange={handleDateChange}
        className="rounded border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-lavender-500 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default SingleDateInput;
