import { useSearchParams } from "react-router-dom";
import DatepickerSearchParams from "../../uiComponents/DatepickerSearchParams";
import TimeSelectionField from "../LiveStt/TimeSelectionField";
import HoursSelector from "./HoursSelector";

import ClearFiltersAndLiveButton from "../../uiComponents/ClearFiltersAndLiveButton";
import MultipleLanguageSelectionDropDown from "./MultipleLanguageSelectionDropDown";
function FiltersbarWordCloud() {
  const [searchParams] = useSearchParams();
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-2">
        {!isLive && (
          <>
            <DatepickerSearchParams />
            <TimeSelectionField slug="startTime" />
            <TimeSelectionField slug="endTime" />
          </>
        )}
        <div></div>

        {/* Hding Search Field for now  */}

        {/* <SearchbarSearchParams /> */}
        {isLive && <HoursSelector />}
        {!isLive && <div />}
        <MultipleLanguageSelectionDropDown />
      </div>

      <div className="my-3 flex items-center justify-end gap-x-4 ">
        <ClearFiltersAndLiveButton />
      </div>
    </div>
  );
}
export default FiltersbarWordCloud;
