import { LegacyRef, useEffect, useState } from "react";
import LabeledInputField from "../../uiComponents/LabeledInputField";
import { useClickAway } from "@uidotdev/usehooks";
import useGetAllChannels from "../../../api/useGetAllChannels";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";

const SelectConfigurationChannels = () => {
  const { data, isError, isLoading } = useGetAllChannels();
  const [channelName, setChannelName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { selectChannelIds } = useManageLiveTv();

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  if (isLoading) return <div></div>;

  if (isError) return <div>Error</div>;

  const filteredData =
    data?.filter((channel) => {
      return channel.name.toLowerCase().includes(channelName.toLowerCase());
    }) ?? [];

  const label = `${String(selectChannelIds.length)} Selected`;

  return (
    <div
      className="group relative"
      onClick={() => {
        setIsOpen(true);
      }}
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      <LabeledInputField
        type="search"
        label={label}
        value={channelName}
        onChange={(e) => {
          setChannelName(e.target.value);
        }}
      />

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 rounded-md border bg-lavender-50">
          {data && <ChannelSelectionList channels={filteredData} />}
        </div>
      )}
    </div>
  );
};

export default SelectConfigurationChannels;

function ChannelSelectionList({
  channels,
}: {
  channels: Array<SingleChannelType>;
}) {
  const { selectChannelIds, updateSelectChannelIds } = useManageLiveTv();

  return (
    <div className="max-h-[200px] overflow-auto px-3">
      {channels.map((channel) => {
        const { id, name } = channel;

        const isThisChannelSelected = selectChannelIds.some(
          (selectedChannelId) => selectedChannelId === id,
        );

        const handleCheckboxChange = () => {
          updateSelectChannelIds(id); // TODO: for multiple selection uncomment this method at store.
        };

        return (
          <span key={id} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              id={name}
              checked={isThisChannelSelected}
              onChange={handleCheckboxChange}
            />
            <p className="text-sm tracking-wide text-gray-800">
              {channel.name}
            </p>
          </span>
        );
      })}
    </div>
  );
}
