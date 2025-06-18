import { useSearchParams } from "react-router-dom";
import DatepickerSearchParams from "../../../uiComponents/DatepickerSearchParams";
import TimeSelectionField from "../../LiveStt/TimeSelectionField";
import MultipleLanguageSelectionDropDown from "../MultipleLanguageSelectionDropDown";
import ClearFiltersAndLiveButton from "../../../uiComponents/ClearFiltersAndLiveButton";
import HoursSelectorSMM from "./HourSelectorSMM";
import MultipleChannelsSelectionDropDown from "../../Tickers/MultipleChannelsSelectionDropDown";

const SMMHeader = () => {
  const [searchParams] = useSearchParams();
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  return (
    <div className="flex flex-col space-y-2">
      {!isLive && (
        <>
          <div className="grid grid-cols-3 gap-2">
            <DatepickerSearchParams />
            <TimeSelectionField slug="startTime" />
            <TimeSelectionField slug="endTime" />
          </div>
        </>
      )}
      <div className="grid grid-cols-3 gap-2">
        {!isLive && (
          <>
            <div />
            <MultipleChannelsSelectionDropDown
              channelFilter={(channel) => channel.isWordCloudActivated}
            />
          </>
        )}
        {isLive && (
          <>
            <div />
            <HoursSelectorSMM />
          </>
        )}
        <MultipleLanguageSelectionDropDown />
      </div>

      <div className="my-3 flex items-center justify-end gap-x-4 ">
        <ClearFiltersAndLiveButton source="wordCloud" />
      </div>
    </div>
  );
};

export default SMMHeader;
