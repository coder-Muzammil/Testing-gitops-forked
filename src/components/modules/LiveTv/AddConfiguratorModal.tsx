import { IoMdCloseCircleOutline } from "react-icons/io";
import FixedInsetZeroDiv from "../../primitives/FixedInsetZeroDiv";
import { useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import ConfiguratorForm from "./ConfiguratorForm";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import toast from "react-hot-toast";
import useAddNewConfiguration from "../../../api/useAddNewConfiguration";
import axios from "axios";

export type ConfiguratorFromDataType = {
  date: DateValueType;
  startTime: string;
  endTime: string;
};

const AddConfiguratorModal = ({ closeModal }: { closeModal: () => void }) => {
  const { mutate: handleAddNewConfiguration, isPending } =
    useAddNewConfiguration();

  const { selectChannelIds, unSelectChannelIds } = useManageLiveTv();

  const [formData, setFormData] = useState<ConfiguratorFromDataType>({
    date: null,
    startTime: "",
    endTime: "",
  });

  const handleFormSubmit = () => {
    if (selectChannelIds.length === 0) {
      toast.error("Please select at least one channel");
      return;
    }

    const data = {
      channels: selectChannelIds,
      date: formData.date
        ? {
            startDate: String(formData.date.startDate),
            endDate: String(formData.date.endDate),
          }
        : {
            startDate: null,
            endDate: null,
          },
      start_time: formData.startTime,
      end_time: formData.endTime,
    };

    handleAddNewConfiguration(data, {
      onSuccess: () => {
        toast.success("Configuration added successfully.");
        setTimeout(() => {
          closeModal();
          unSelectChannelIds();
        }, 1000);
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError<Record<string, Array<string>>>(error)) {
          const errData = error.response?.data;

          if (!errData) {
            toast.error(error.message);
            return;
          }

          const firstKey = Object.keys(errData)[0];
          toast.error(error.response?.data[firstKey][0] ?? error.message);
        }
      },
    });
  };

  return (
    <FixedInsetZeroDiv>
      <div className="w-11/12 max-w-md rounded-sm bg-white px-3 py-4 shadow-sm shadow-gray-50 dark:bg-slate-600">
        <div className="my-2 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-lavender-600">
            Add Configurator
          </h1>
          <IoMdCloseCircleOutline
            className="cursor-pointer"
            size={20}
            onClick={() => {
              closeModal();
              unSelectChannelIds();
            }}
          />
        </div>

        <ConfiguratorForm
          label="Save"
          formData={formData}
          isPending={isPending}
          setFormData={setFormData}
          onSubmitForm={handleFormSubmit}
        />
      </div>
    </FixedInsetZeroDiv>
  );
};

export default AddConfiguratorModal;
