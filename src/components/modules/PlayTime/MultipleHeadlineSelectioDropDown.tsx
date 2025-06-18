import { useState, LegacyRef } from "react";
import useGetAllHeadlinesTime from "../../../api/useGetAllHeadlinesTime";
import { SingleHeadlineEntryType } from "../../../api/responseTypes/manageHeadlines.types";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import LabeledInputField from "../../uiComponents/LabeledInputField";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { useClickAway } from "@uidotdev/usehooks";
import AddPlaytimeForm from "./AddPlaytimeForm";
import { channelsLabelType } from "../LiveStt/newsGptAndPlayTime/MultipleHeadlineSelectionDropdown";
import useDeleteHeadline from "../../../api/useDeleteHeadline";
import toast from "react-hot-toast";
import { useSttLiveContext } from "../LiveStt/useSttLiveContext";

const MultipleHeadlinesSelectionDropdown = ({
  setSelectedChannels,
  setSelectedTimeList,
  setHeadlineTitle,
}: {
  setSelectedChannels: (channels: Array<Array<string>>) => void;
  setSelectedTimeList: (timeList: string) => void;
  setHeadlineTitle: (headlineTitle: Array<string>) => void;
}) => {
  const { formatTimeToAmPm } = useDateTimeUtils();
  const { data: headlineEntries } = useGetAllHeadlinesTime();
  const { mutate: deleteHeadline } = useDeleteHeadline();
  const [channelLabel, setChannelLabel] = useState<channelsLabelType>({
    name: "",
    startTime: "",
    endTime: "",
    id: 0,
    channels: [],
  });
  const [selectedHeadlines, setSelectedHeadlines] = useState<
    Array<SingleHeadlineEntryType>
  >([]);
  const { setIsStarPlayModalOpen } = useSttLiveContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpenPlaytimeForm, setIsOpenPlaytimeForm] = useState(false);

  const ref = useClickAway(() => {
    setShowDropDown(false);
  });

  const handleEditButtonClick = (channel: SingleHeadlineEntryType) => {
    setChannelLabel({
      ...channel.label,
      id: channel.id,
      channels: channel.channels,
    });
    setIsOpenPlaytimeForm(true);
    setShowDropDown(false);
  };
  const handleSelectHeadline = (entry: SingleHeadlineEntryType) => {
    let updatedHeadlines;

    if (selectedHeadlines.find((e) => e.id === entry.id)) {
      updatedHeadlines = selectedHeadlines.filter((e) => e.id !== entry.id);
    } else {
      updatedHeadlines = [...selectedHeadlines, entry];
    }

    setSelectedHeadlines(updatedHeadlines);

    setSelectedTimeList(updatedHeadlines.map((h) => h.value).join(","));

    setHeadlineTitle(updatedHeadlines.map((h) => h.label.name));

    setSelectedChannels(updatedHeadlines.map((h) => h.channels));
  };

  const handleDeleteSingleHeadline = (id: number) => {
    deleteHeadline(id, {
      onSuccess: () => {
        toast.success("Headline deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete the Headline.");
      },
    });
  };
  const labelText =
    selectedHeadlines.length === headlineEntries?.length
      ? "All selected"
      : selectedHeadlines.length > 0
        ? `${String(selectedHeadlines.length)} selected`
        : "All Headlines";
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
        placeholder="Select Headlines"
      />

      {showDropDown && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-7 z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white p-1 shadow-md dark:bg-slate-600"
        >
          {headlineEntries?.length === 0 && (
            <p className="text-sm text-red-400">
              No Headlines found, Please add headlines first.
            </p>
          )}
          {headlineEntries?.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[30%_50%_15%] items-center justify-between "
            >
              <div className="flex items-center gap-2 ">
                <input
                  type="checkbox"
                  checked={!!selectedHeadlines.find((e) => e.id === entry.id)}
                  onChange={() => {
                    setIsStarPlayModalOpen(false);
                    handleSelectHeadline(entry);
                  }}
                />
                <label htmlFor={String(entry.value)}>
                  <p>{entry.label.name}</p>
                  <p>
                    {`(${formatTimeToAmPm(entry.label.startTime)} - ${formatTimeToAmPm(entry.label.endTime)})`}
                  </p>
                </label>
              </div>
              <div className="flex justify-between gap-3 ">
                <div>
                  <label className="text-sm text-gray-400">
                    {entry.channels.map((channel) => channel).join(", ")}
                  </label>
                </div>
              </div>

              <div className="flex gap-2 ">
                <div
                  onClick={() => {
                    handleDeleteSingleHeadline(entry.id);
                  }}
                  className="cursor-pointer"
                >
                  <MdDelete size={22} />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleEditButtonClick(entry);
                  }}
                >
                  <TiEdit size={22} />
                </div>
              </div>
            </div>
          ))}
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

export default MultipleHeadlinesSelectionDropdown;
