import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const ChannelTypeSelectionDropDown = () => {
  const [, setSearchParams] = useSearchParams();
  const [, setSelectedChannelType] = useState("local_channel");
  return (
    <div className="w-full ">
      <select
        disabled
        name="channelType"
        // value={selectedChannelType}
        className="h-8 w-full rounded border border-purple-300  shadow-lg outline-none disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-300  dark:bg-gray-700 "
        onChange={(e) => {
          setSelectedChannelType(e.target.value);
          setSearchParams((currentParams) => {
            currentParams.set("channelType", e.target.value);
            return currentParams;
          });
        }}
      >
        <option value="local_channel">Local Channel</option>
        <option value="international_channel">International Channel</option>
      </select>
    </div>
  );
};

export default ChannelTypeSelectionDropDown;
