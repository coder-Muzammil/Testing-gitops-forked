import CustomSelect from "../../primitives/CustomSelect";
import { PiClockCountdownFill } from "react-icons/pi";

const avaiableHours = [
  { value: "5:min", label: "5 min" },
  { value: "10:min", label: "10 min" },
  { value: "15:min", label: "15 min" },
  { value: "30:min", label: "30 min" },
  { value: "1:hour", label: "1 hour" },
  { value: "2:hour", label: "2 hour" },
  { value: "3:hour", label: "3 hour" },
  { value: "4:hour", label: "4 hour" },
  { value: "5:hour", label: "5 hour" },
];

function HoursSelector() {
  return (
    <div>
      <CustomSelect
        options={avaiableHours}
        placeholder=""
        PlaceholderIcon={PiClockCountdownFill}
      />
    </div>
  );
}
export default HoursSelector;
