import { useSearchParams } from "react-router-dom";
import StyledDatepicker from "../primitives/StyledDatepicker";
import { DateValueType } from "react-tailwindcss-datepicker";

// TODO: we can also pass a slug to be set in UrlSearchParams like we did in LiveStt/TimeSelectionField.tsx
function DatepickerSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSetDate(newValue: DateValueType) {
    setSearchParams((currentParams) => {
      if (!newValue) {
        currentParams.delete("startDate");
        currentParams.delete("endDate");
        return currentParams;
      }

      const { startDate, endDate } = newValue;

      if (startDate !== null) {
        currentParams.set("startDate", String(startDate));
      } else {
        currentParams.delete("startDate");
      }

      if (endDate !== null) {
        currentParams.set("endDate", String(endDate));
      } else {
        currentParams.delete("endDate");
      }

      return currentParams;
    });
  }

  const selectedStartDate = searchParams.get("startDate") ?? null;
  const selectedEndDate = searchParams.get("endDate") ?? null;
  return (
    <StyledDatepicker
      datepickerProps={{
        value: {
          startDate: selectedStartDate,
          endDate: selectedEndDate,
        },
        onChange: (e) => {
          handleSetDate(e);
        },
      }}
    />
  );
}
export default DatepickerSearchParams;
