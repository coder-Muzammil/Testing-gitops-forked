import { LegacyRef, useEffect, useState } from "react";
import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";
import useGetAllChannels from "../../../api/useGetAllChannels";
import LabeledInputField from "../../uiComponents/LabeledInputField";
import placeholderLogo from "../../../assets/images.png";
import { useClickAway } from "@uidotdev/usehooks";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

function ChannelSelectionBar({
  label,
  selectedEntry,
}: {
  label: string;
  selectedEntry: {
    label: string | number;
    value: string | number;
  };
}) {
  const { data, isError, isLoading } = useGetAllChannels();
  const [channelQuery, setChannelQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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

  // const filteredData =
  //   filteredChannels?.filter((channel) => {
  //     return channel.name.toLowerCase().includes(channelQuery.toLowerCase());
  //   }) ?? [];

  const filteredData =
    data
      ?.filter(
        (channel) =>
          selectedEntry.value === "all" ||
          channel.channel_type === selectedEntry.value,
      )
      .filter((channel) =>
        channel.name.toLowerCase().includes(channelQuery.toLowerCase()),
      ) ?? [];

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
        value={channelQuery}
        onChange={(e) => {
          setChannelQuery(e.target.value);
        }}
      />
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 rounded-md border bg-lavender-50">
          {data && <ChannelsList channels={filteredData} />}
        </div>
      )}
    </div>
  );
}
export default ChannelSelectionBar;

function ChannelsList({ channels }: { channels: Array<SingleChannelType> }) {
  const { addChannel, selectedChannels, removeChannel } = useManageLiveTv();
  return (
    <div className="max-h-[200px] overflow-auto px-3  dark:bg-gray-800">
      {channels.map((channel) => {
        const { id, name, logo, isLive } = channel;

        const isThisChannelSelected = selectedChannels.some(
          (selectedChannel) => selectedChannel.id === id,
        );

        function handleCheckboxChange() {
          if (isThisChannelSelected) {
            removeChannel(channel.id);
          } else {
            addChannel(channel);
            if (!isLive) {
              toast.success(
                "This channel is not live right now due to some reason but you can view recorded data.",
              );
            }
          }
        }

        return (
          <label
            htmlFor={name}
            className="flex justify-between gap-2 rounded-md px-3 py-3 hover:bg-lavender-300 dark:hover:bg-gray-700"
            key={id}
          >
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                name={name}
                id={name}
                checked={isThisChannelSelected}
                onChange={handleCheckboxChange}
              />

              <span className="flex items-center gap-2">
                <img
                  src={logo ? logo : placeholderLogo}
                  alt={name}
                  className="h-6 w-6"
                />
                <p>{channel.name}</p>
              </span>
            </span>
            <span>
              <span
                className={twMerge(
                  "block aspect-square h-3 rounded-full bg-green-600",
                  !isLive && "bg-red-600",
                )}
              ></span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
