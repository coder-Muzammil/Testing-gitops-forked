import { IoMdCloseCircleOutline } from "react-icons/io";
import FixedInsetZeroDiv from "../../primitives/FixedInsetZeroDiv";
import ConfiguratorForm from "./ConfiguratorForm";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import { SingleConfiguratorType } from "../../../api/responseTypes/getAllConfigurators.types";
import { ConfiguratorFromDataType } from "./AddConfiguratorModal";
import { useEffect, useState } from "react";
import useUpdateConfigurator from "../../../api/useUpdateConfigurator";
import toast from "react-hot-toast";
import axios from "axios";

const UpdateConfiguratorModal = ({
  closeModal,
  singleConfigurator,
}: {
  closeModal: () => void;
  singleConfigurator: SingleConfiguratorType;
}) => {
  const { mutate: handleUpdateConfigurator, isPending } =
    useUpdateConfigurator();

  const { selectChannelIds, updateSelectChannelIds, unSelectChannelIds } =
    useManageLiveTv();

  const [formData, setFormData] = useState<ConfiguratorFromDataType>({
    date: null,
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    setFormData({
      date: singleConfigurator.date,
      startTime: singleConfigurator.start_time,
      endTime: singleConfigurator.end_time,
    });
    singleConfigurator.channels.forEach((item) => {
      updateSelectChannelIds(item);
    });
  }, [singleConfigurator, updateSelectChannelIds]);

  const handleFormSubmit = () => {
    if (selectChannelIds.length === 0) {
      toast.error("Please select at least one channel");
      return;
    }

    const data = {
      channels: selectChannelIds,
      date: {
        startDate:
          formData.date?.startDate !== null
            ? String(formData.date?.startDate)
            : null,
        endDate:
          formData.date?.endDate !== null
            ? String(formData.date?.endDate)
            : null,
      },
      start_time: formData.startTime,
      end_time: formData.endTime,
    };

    // console.log({ data });

    handleUpdateConfigurator(
      { data, id: singleConfigurator.id },
      {
        onSuccess: () => {
          toast.success("Configuration updated successfully.");
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
      },
    );
  };

  return (
    <FixedInsetZeroDiv>
      <div className="w-11/12 max-w-md rounded-sm bg-white px-3 py-4 shadow-sm shadow-gray-50 dark:bg-slate-500">
        <div className="my-2 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-lavender-600">
            Update Configurator
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
          label="Update"
          formData={formData}
          isPending={isPending}
          setFormData={setFormData}
          onSubmitForm={handleFormSubmit}
        />
      </div>
    </FixedInsetZeroDiv>
  );
};

export default UpdateConfiguratorModal;
