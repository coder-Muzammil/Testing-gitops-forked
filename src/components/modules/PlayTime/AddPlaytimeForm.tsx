import React, { useEffect, useState } from "react";

import Input from "../../primitives/Input";
import Portal from "../../primitives/Portal";
import useAddNewHeadlineTime from "../../../api/useAddNewHeadlineTime";
import toast from "react-hot-toast";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import useUpdateHeadline from "../../../api/useUpdateHeadline";
import PlayTimeChannelsSelectionField from "../LiveStt/newsGptAndPlayTime/PlayTimeChannelsSelectionField";
import { channelsLabelType } from "../LiveStt/newsGptAndPlayTime/MultipleHeadlineSelectionDropdown";

const AddPlaytimeForm = ({
  setIsOpen,
  channelLabel,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channelLabel?: channelsLabelType;
}) => {
  const {
    mutate: addHeadlineTime,
    isPending,
    error,
    isError,
  } = useAddNewHeadlineTime();
  const { mutate: updateHeadlineTime } = useUpdateHeadline();

  const [headlineTitle, setHeadlineTitle] = useState(channelLabel?.name ?? "");
  const [startTime, setStartTime] = useState(channelLabel?.startTime ?? "");
  const [endTime, setEndTime] = useState(channelLabel?.endTime ?? "");
  const [selectedChannels, setSelectedChannels] = useState<Array<string>>(
    channelLabel?.channels ?? [],
  );

  // When form opens, merge existing channels with selected ones
  useEffect(() => {
    if (channelLabel?.channels.length) {
      setSelectedChannels((prev) => [
        ...new Set([...prev, ...channelLabel.channels]),
      ]);
    }
  }, [channelLabel?.channels]);

  if (isError) {
    console.log("error", error);
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;

    if (startTime) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = newEndTime.split(":").map(Number);

      const totalStartMunites = startHour * 60 + startMinute;
      const totalEndMunites = endHour * 60 + endMinute;

      if (totalEndMunites < totalStartMunites) {
        toast.error("End time must be greater than start time!");
        return;
      }

      if (totalEndMunites - totalStartMunites > 60) {
        toast.error("End time must be within one hour of start time!");
        return;
      }
    }

    setEndTime(newEndTime);
  };

  const handleSubmitPlayTimeForm = () => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (end <= start) {
      toast.error("End time cannot be smaller or equal to start time.");
      return;
    }

    if (channelLabel?.name) {
      updateHeadlineTime(
        {
          title: headlineTitle,
          startTime,
          endTime,
          id: channelLabel.id,
          channels: selectedChannels,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            toast.success("Updated Playtime successfully");
            setHeadlineTitle("");
          },
          onError: (error: unknown) => {
            console.error("error", error);
            if (axios.isAxiosError(error)) {
              toast.error("Failed to add playtime" + error.message);
            }
          },
        },
      );
    } else {
      addHeadlineTime(
        {
          title: headlineTitle,
          startTime,
          endTime,
          channels: selectedChannels,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            toast.success("Playtime added successfully");
            setHeadlineTitle("");
          },
          onError: (error: unknown) => {
            console.error("error", error);

            // Fallback for other error types
            toast.error("Something went wrong.");
          },
        },
      );
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70">
        <div className="grid h-auto w-1/3 rounded-md bg-white p-3 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <p className="my-2 text-xl font-semibold text-lavender-600">
              Add New Playtime
            </p>
            <MdOutlineCancel
              onClick={() => {
                setIsOpen(false);
              }}
              size={24}
              cursor="pointer"
              className="dark:text-white"
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitPlayTimeForm();
            }}
            className="mt-1 space-y-3"
          >
            <PlayTimeChannelsSelectionField
              selectedChannels={selectedChannels}
              setSelectedChannels={setSelectedChannels}
            />
            <Input
              placeholder="Headline Title"
              name="headlineTitle"
              value={headlineTitle}
              onChange={(e) => {
                setHeadlineTitle(e.target.value);
              }}
              required
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  // setEndTime(e.target.value);
                }}
              />
              <Input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="rounded-md bg-lavender-600 px-2 py-1 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-lavender-400"
                disabled={isPending}
              >
                {channelLabel?.name ? "Update" : "Save"} Headline Time
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default AddPlaytimeForm;
