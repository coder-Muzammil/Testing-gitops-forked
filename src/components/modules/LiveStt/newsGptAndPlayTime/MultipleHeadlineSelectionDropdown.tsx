import { useClickAway } from "@uidotdev/usehooks";
import { useState, LegacyRef, useEffect } from "react";
import LabeledInputField from "../../../uiComponents/LabeledInputField";
import { SingleHeadlineEntryType } from "../../../../api/responseTypes/manageHeadlines.types";
// import useDeleteHeadline from "../../../../api/useDeleteHeadline";
// import toast from "react-hot-toast";
// import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import AddPlaytimeForm from "../../PlayTime/AddPlaytimeForm";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { MdDelete } from "react-icons/md";
// import { useSearchParams } from "react-router-dom";
export type channelsLabelType = {
  name: string;
  startTime: string;
  endTime: string;
  id: number;
  channels: Array<string>;
};
const MultipleHeadlinesDropDown = ({
  placeholderText,
  handleOptionsSelection,
  selectedOptions,
  entries,
  handleDeleteSingleHeadline,
}: {
  placeholderText?: string;
  selectedOptions: string;
  handleOptionsSelection: (
    channelValue: string,
    titleName: string,
    entry: SingleHeadlineEntryType,
  ) => void;
  entries: Array<SingleHeadlineEntryType>;
  handleDeleteSingleHeadline: (id: number, value: string) => void;
}) => {
  const [channelLabel, setChannelLabel] = useState<channelsLabelType>({
    name: "",
    startTime: "",
    endTime: "",
    id: 0,
    channels: [],
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredChannels, setFilteredChannels] = useState(entries);
  const [isOpenPlaytimeForm, setIsOpenPlaytimeForm] = useState(false);
  // const [, setSearchParams] = useSearchParams();
  // const { mutate: deleteHeadline } = useDeleteHeadline();
  const { formatTimeToAmPm } = useDateTimeUtils();

  // Filter the entries based on the search input
  useEffect(() => {
    const filtered = entries.filter((channel) =>
      String(channel.label).toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredChannels(filtered);
  }, [search, entries]);

  const ref = useClickAway(() => {
    setShowDropDown(false);
  });

  // Dynamically update the label text
  const labelText =
    selectedOptions.length === entries.length
      ? "All selected"
      : selectedOptions.length > 0
        ? `${String(selectedOptions.length)} selected`
        : "All Headlines";

  const handleEditButtonClick = (channel: SingleHeadlineEntryType) => {
    // Set channel label state for the clicked headline
    setChannelLabel({
      ...channel.label,
      id: channel.id,
      channels: channel.channels,
    });
    // Open the playtime form
    setIsOpenPlaytimeForm(true);
    setShowDropDown(false);
  };

  return (
    <div
      className="relative h-8 items-center justify-center rounded-md"
      onClick={() => {
        setShowDropDown(true);
      }}
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
    >
      <LabeledInputField
        type="search"
        label={labelText}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder={placeholderText}
      />
      {showDropDown && !isOpenPlaytimeForm && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-7 z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white p-1 shadow-md"
        >
          {entries.length === 0 && (
            <p className="text-sm text-red-400">
              No Headlines found, Please add headlines first.
            </p>
          )}
          {(filteredChannels.length > 0 ? filteredChannels : entries).map(
            (channel) => {
              return (
                <div
                  key={channel.id}
                  className="grid grid-cols-[30%_50%_15%] items-center justify-between "
                >
                  <div className="flex items-center gap-2 ">
                    <input
                      type="checkbox"
                      id={String(channel.id)}
                      checked={selectedOptions.includes(String(channel.id))}
                      onChange={() => {
                        handleOptionsSelection(
                          channel.value,
                          channel.label.name,
                          channel,
                        );
                      }}
                    />
                    <label htmlFor={String(channel.value)}>
                      <p>{channel.label.name}</p>
                      <p>
                        {`(${formatTimeToAmPm(channel.label.startTime)} - ${formatTimeToAmPm(channel.label.endTime)})`}
                      </p>
                    </label>
                  </div>
                  <div className="flex justify-between gap-3 ">
                    <div>
                      <label className="text-sm text-gray-400">
                        {channel.channels.map((channel) => channel).join(", ")}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 ">
                    <div
                      onClick={() => {
                        handleDeleteSingleHeadline(channel.id, channel.value);
                      }}
                      className="cursor-pointer"
                    >
                      <MdDelete size={22} />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleEditButtonClick(channel);
                      }}
                    >
                      <TiEdit size={22} />
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      )}
      {isOpenPlaytimeForm && (
        <AddPlaytimeForm
          setIsOpen={setIsOpenPlaytimeForm}
          channelLabel={channelLabel}
        />
      )}
    </div>
  );
};

export default MultipleHeadlinesDropDown;
