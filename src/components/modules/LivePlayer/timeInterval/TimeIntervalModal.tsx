import { IoMdCloseCircleOutline } from "react-icons/io";
import FixedInsetZeroDiv from "../../../primitives/FixedInsetZeroDiv";
import Portal from "../../../primitives/Portal";
import TimeIntervalForm from "./TimeIntervalForm";
import { ConfiguratorFromDataType } from "../../LiveTv/AddConfiguratorModal";
import { useState } from "react";
import { useLivePlayerContext } from "../../../../hooks/useLivePlayerContext";
import useAddPlayTimeInterval from "../../../../api/useAddPlayTimeInterval";
import toast from "react-hot-toast";
import axios from "axios";
import { useManageLiveTv } from "../../../../stores/useManageLiveTv";

const TimeIntervalModal = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { mutate: addNewPlayTimeInterval, isPending } =
    useAddPlayTimeInterval();
  const { channel } = useLivePlayerContext();
  const { updateHourPlay } = useManageLiveTv();
  const [formData, setFormData] = useState<ConfiguratorFromDataType>({
    date: null,
    startTime: "",
    endTime: "",
  });

  function handleFormSubmit() {
    const { date, startTime, endTime } = formData;

    const newFormData = {
      date: String(date?.startDate),
      startTime,
      endTime,
      channelName: channel.name,
    };

    addNewPlayTimeInterval(newFormData, {
      onSuccess: (data) => {
        const {
          data: { file_name },
        } = data;

        updateHourPlay({
          channelId: channel.id,
          hourPlay: file_name,
        });

        toast.success("Time interval added successfully.");
        onCloseModal();
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError<Record<string, string>>(error)) {
          const errData = error.response?.data;

          if (!errData) {
            toast.error(error.message);
            return;
          }

          toast.error(errData.error);
        }
      },
    });
  }

  return (
    <Portal>
      <FixedInsetZeroDiv>
        <div className="w-11/12 max-w-md rounded-sm bg-white px-3 py-4 shadow-sm shadow-gray-50 dark:bg-slate-500">
          <div className="my-2 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-lavender-600">
              Set Time Interval
            </h1>
            <IoMdCloseCircleOutline
              className="cursor-pointer"
              size={20}
              onClick={() => {
                onCloseModal();
              }}
            />
          </div>

          <TimeIntervalForm
            label="Save"
            formData={formData}
            isPending={isPending}
            setFormData={setFormData}
            onSubmitForm={handleFormSubmit}
          />
        </div>
      </FixedInsetZeroDiv>
    </Portal>
  );
};

export default TimeIntervalModal;
