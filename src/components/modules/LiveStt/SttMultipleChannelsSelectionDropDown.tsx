import useGetAllChannels from "../../../api/useGetAllChannels";
import MultipleSelectionsDropDown from "../../primitives/MultipleSelectionsDropDown";
import { useSearchParams } from "react-router-dom";

const SttMultipleChannelsSelectionDropDown = ({ slug }: { slug: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: channelsData } = useGetAllChannels();
  const channelsEntries =
    channelsData?.map((entry) => ({
      value: entry.name,
      label: entry.name,
    })) ?? [];
  // const channelsEntries = [
  //   // { value: "AryNews", label: "ARY News" },
  //   // { value: "GeoNews", label: "Geo News" },
  //   // { value: "ExpressNews", label: "Express News" },
  //   // { value: "samaa_news", label: "Samaa News" },
  //   { value: "tnnb", label: "TNNB" },
  //   { value: "republic_bharat", label: "Republic Bharat" },
  //   { value: "india_today", label: "India Today" },
  // ];

  const channels = searchParams.get("selectedChannel")?.split(",") ?? [];

  const handleOptionsSelection = (channelValue: string) => {
    let newSelectedChannels: Array<string>;

    if (channelValue === "") {
      // If "All" is clicked
      if (channels.length === channelsEntries.length) {
        // Deselect all if "All" is already selected
        newSelectedChannels = [];
      } else {
        // Select all channels
        newSelectedChannels = channelsEntries.map((entry) => entry.value);
      }
    } else {
      // Toggle individual channel selection
      if (channels.includes(channelValue)) {
        newSelectedChannels = channels.filter(
          (value) => value !== channelValue,
        );
      } else {
        newSelectedChannels = [...channels, channelValue];
      }
    }

    setSearchParams((currentParams) => {
      if (newSelectedChannels.length === 0) {
        currentParams.delete("channel");
      } else {
        currentParams.set("selectedChannel", newSelectedChannels.join(","));
      }
      return currentParams;
    });
  };

  return (
    <>
      <MultipleSelectionsDropDown
        slug={slug}
        placeholderText="Select Channels"
        selectedOptions={channels}
        handleOptionsSelection={handleOptionsSelection}
        entries={[{ label: "All", value: "" }, ...channelsEntries]}
      />
    </>
  );
};

export default SttMultipleChannelsSelectionDropDown;
