import { PiClockCountdownFill } from "react-icons/pi";
import CustomSelect from "../../../primitives/CustomSelect";
import { useSearchParams } from "react-router-dom";
const availableHours = [
  { value: 1, label: "1 hour" },
  { value: 2, label: "2 hours" },
  { value: 3, label: "3 hours" },
  { value: 4, label: "4 hours" },
  { value: 5, label: "5 hours" },
  { value: 6, label: "6 hours" },
  { value: 7, label: "7 hours" },
  { value: 8, label: "8 hours" },
  { value: 9, label: "9 hours" },
  { value: 10, label: "10 hours" },
  { value: 11, label: "11 hours" },
  { value: 12, label: "12 hours" },
  { value: 13, label: "13 hours" },
  { value: 14, label: "14 hours" },
  { value: 15, label: "15 hours" },
  { value: 16, label: "16 hours" },
  { value: 17, label: "17 hours" },
  { value: 18, label: "18 hours" },
  { value: 19, label: "19 hours" },
  { value: 20, label: "20 hours" },
  { value: 21, label: "21 hours" },
  { value: 22, label: "22 hours" },
  { value: 23, label: "23 hours" },
  { value: 24, label: "24 hours" },
];

function HoursSelectorSMM() {
  const [searchParams] = useSearchParams();
  const hours = searchParams.get("hours") ?? "1";

  return (
    <div>
      <CustomSelect
        options={availableHours}
        placeholder={`${hours} hours`}
        PlaceholderIcon={PiClockCountdownFill}
      />
    </div>
  );
}
export default HoursSelectorSMM;
