// import { useSearchParams } from "react-router-dom";
// import MultipleSelectionsDropDown from "../../../primitives/MultipleSelectionsDropDown";
// import useGetAllChannels from "../../../../api/useGetAllChannels";

// const PlayTimeChannelsSelectionField = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { data } = useGetAllChannels();

//   // Map channels data into dropdown entries
//   const channelsEntries = data?.map((entry) => ({
//     label: entry.name,
//     value: entry.name,
//   }));

//   // Parse the current channels from the search params
//   const channels = searchParams.get("playTimeChannels")?.split(",") ?? [];

//   // Handle channel selection logic
//   const handleOptionsSelection = (channelValue: string) => {
//     setSearchParams((currentParams) => {
//       const updatedParams = new URLSearchParams(currentParams);
//       let newSelectedChannels: Array<string>;

//       // Get the existing playTimeChannels from params
//       const existingChannels =
//         updatedParams.get("playTimeChannels")?.split(",") ?? [];

//       if (channelValue === "") {
//         // If "All" is clicked, select all or clear selection
//         newSelectedChannels =
//           existingChannels.length === channelsEntries?.length
//             ? []
//             : channelsEntries?.map((entry) => entry.value) ?? [];
//       } else {
//         // If there's no existing value in params, start fresh
//         if (existingChannels.length === 0) {
//           newSelectedChannels = [channelValue];
//         } else {
//           // Add or remove the selected channel
//           if (existingChannels.includes(channelValue)) {
//             newSelectedChannels = existingChannels.filter(
//               (value) => value !== channelValue,
//             );
//           } else {
//             newSelectedChannels = [...existingChannels, channelValue];
//           }
//         }
//       }

//       // Update search params
//       if (newSelectedChannels.length === 0) {
//         updatedParams.delete("playTimeChannels");
//       } else {
//         updatedParams.set("playTimeChannels", newSelectedChannels.join(","));
//       }

//       return updatedParams; // Preserve other existing params
//     });
//   };

//   return (
//     <>
//       <MultipleSelectionsDropDown
//         placeholderText="Select Channels"
//         selectedOptions={channels}
//         handleOptionsSelection={handleOptionsSelection}
//         entries={[{ label: "All", value: "" }, ...(channelsEntries ?? [])]}
//       />
//     </>
//   );
// };

// export default PlayTimeChannelsSelectionField;

import MultipleSelectionsDropDown from "../../../primitives/MultipleSelectionsDropDown";
import useGetAllChannels from "../../../../api/useGetAllChannels";

const PlayTimeChannelsSelectionField = ({
  selectedChannels,
  setSelectedChannels,
}: {
  selectedChannels: Array<string>;
  setSelectedChannels: React.Dispatch<React.SetStateAction<Array<string>>>;
}) => {
  const { data } = useGetAllChannels();

  // Map channels data into dropdown entries
  const channelsEntries = data?.map((entry) => ({
    label: entry.name,
    value: entry.name,
  }));

  // Handle channel selection logic
  const handleOptionsSelection = (channelValue: string) => {
    setSelectedChannels((prevSelected) => {
      let newSelectedChannels: Array<string>;

      if (channelValue === "") {
        // If "All" is clicked, select all or clear selection
        newSelectedChannels =
          prevSelected.length === channelsEntries?.length
            ? []
            : channelsEntries?.map((entry) => entry.value) ?? [];
      } else {
        // Add or remove the selected channel
        if (prevSelected.includes(channelValue)) {
          newSelectedChannels = prevSelected.filter(
            (value) => value !== channelValue,
          );
        } else {
          newSelectedChannels = [...prevSelected, channelValue];
        }
      }

      return newSelectedChannels;
    });
  };

  return (
    <>
      <MultipleSelectionsDropDown
        placeholderText="Select Channels"
        selectedOptions={selectedChannels}
        handleOptionsSelection={handleOptionsSelection}
        entries={[{ label: "All", value: "" }, ...(channelsEntries ?? [])]}
      />
    </>
  );
};

export default PlayTimeChannelsSelectionField;
