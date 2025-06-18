import { useSearchParams } from "react-router-dom";
import DropdownSingleSelect, {
  DropdownSingleSelectOptionsType,
} from "../../primitives/DropdownSingleSelect";
import { useEffect } from "react";

const options = [
  { id: 4, value: "all", label: "All" },
  { id: 0, value: "express_news", label: "Express News" },
  { id: 1, value: "ary_news", label: "ARY News" },
  { id: 2, value: "geo_news", label: "Geo News" },
];

function ChannelSelectionDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSetOption(entry: DropdownSingleSelectOptionsType) {
    setSearchParams((currentParams) => {
      if (!entry) {
        currentParams.delete("selectedChannel");
        return currentParams;
      }

      currentParams.set("selectedChannel", String(entry.value));

      const selectedChannelId =
        options.find((option) => option.value === entry.value)?.id ?? 0;
      currentParams.set("selectedChannelId", String(selectedChannelId));

      return currentParams;
    });
  }

  const selectedChannel = searchParams.get("selectedChannel");

  useEffect(() => {
    function setInitialParams() {
      setSearchParams((currentParams) => {
        currentParams.set("selectedChannel", options[0].value);
        currentParams.set("selectedChannelId", String(options[0].id));
        return currentParams;
      });
    }

    const isParamsAlreadySet = options.some(
      (option) => option.value === selectedChannel,
    );

    if (!isParamsAlreadySet) {
      setInitialParams();
    }
  }, [setSearchParams, selectedChannel]);

  
  return (
    <DropdownSingleSelect
      entries={options.map((option) => ({
        label: option.label,
        value: option.value,
      }))}
      handleSetOption={handleSetOption}
      placeholderText="Select Channel"
      selectedOption={
        options.find((option) => option.value === selectedChannel) ?? null
      }
    />
  );
}
export default ChannelSelectionDropdown;
