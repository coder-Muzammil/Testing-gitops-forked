import Datepicker, { DatepickerType } from "react-tailwindcss-datepicker";

function StyledDatepicker({
  datepickerProps,
}: {
  datepickerProps: DatepickerType;
}) {
  return (
    <Datepicker
      maxDate={new Date()}
      {...datepickerProps}
      inputClassName="h-6 w-full rounded-md border bg-white dark:text-gray-100 dark:bg-gray-700 px-2 py-2 shadow-sm focus:border-fuchsia-700 focus:outline-none 2xl:h-8 placeholder:text-xs 2xl:placeholder:text-sm"
    />
  );
}
export default StyledDatepicker;
