import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdOutlineEditNote } from "react-icons/md";
import useGetAllConfigurator from "../../../api/useGetAllConfigurator";
import useDeleteConfigurator from "../../../api/useDeleteConfigurator";
import { useState } from "react";
import useGetSingleConfigurator from "../../../api/useGetSingleConfigurator";
import toast from "react-hot-toast";
import UpdateConfiguratorModal from "./UpdateConfiguratorModal";

const ViewConfigurationsModal = ({
  channelId,
  channelName,
  closeModal,
}: {
  channelId: number;
  channelName: string;
  closeModal: () => void;
}) => {
  const [configId, setConfigId] = useState<number | null>(null);

  const { data, isLoading, isError, error } = useGetAllConfigurator({
    channelId,
  });

  const { mutate: deleteConfigurator, isPending } = useDeleteConfigurator();

  const {
    data: singleConfigurator,
    isLoading: isSingleConfigLoading,
    isError: isSingleConfigError,
    error: singleConfigError,
  } = useGetSingleConfigurator(configId ?? undefined, {
    queryKey: ["getSingleConfigurator", configId],
    enabled: !!configId,
  });

  if (isSingleConfigError) {
    toast.error(singleConfigError.message);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-11/12 max-w-md rounded-sm bg-white px-3 py-4 shadow-sm shadow-gray-50 dark:bg-slate-600">
        <div className="my-2 flex items-center justify-between">
          <p className="text-lg font-semibold text-lavender-600">
            Configurators Detail of {channelName}
          </p>
          <IoMdCloseCircleOutline
            className="cursor-pointer"
            size={20}
            onClick={() => {
              closeModal();
            }}
          />
        </div>

        {isError && <ErrorMessage error={error} />}
        {isLoading && <ShowLoading />}

        {data && (
          <div className="mt-2 max-h-96 space-y-2 overflow-y-auto">
            {data.length === 0 && <NotFound />}
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-md bg-gray-100 px-2 py-1"
              >
                <span className="flex-1 text-sm">
                  {item.date.startDate && item.date.endDate
                    ? `${item.date.startDate} to ${item.date.endDate}`
                    : "Daily Configurator"}
                </span>
                <span className="text-sm">
                  {item.start_time} - {item.end_time}
                </span>
                <div className="flex justify-center">
                  <button disabled={isSingleConfigLoading}>
                    <MdOutlineEditNote
                      size={25}
                      cursor="pointer"
                      className="text-blue-600"
                      onClick={() => {
                        setConfigId(item.id);
                      }}
                      title="Update Configurator"
                    />
                  </button>
                  <button disabled={isPending}>
                    <MdDeleteOutline
                      size={24}
                      cursor="pointer"
                      className="text-red-600"
                      onClick={() => {
                        deleteConfigurator(item.id);
                      }}
                      title="Delete Configurator"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {singleConfigurator && (
        <UpdateConfiguratorModal
          closeModal={() => {
            setConfigId(null);
          }}
          singleConfigurator={singleConfigurator}
        />
      )}
    </div>
  );
};

export default ViewConfigurationsModal;

function ErrorMessage({ error }: { error: Error | null }) {
  return (
    <span className="text-sm font-thin text-red-600">{error?.message}</span>
  );
}
function ShowLoading() {
  return <span className="text-sm font-thin text-blue-600">Loading...</span>;
}
function NotFound() {
  return (
    <span className="text-sm font-semibold text-blue-400">Data not found.</span>
  );
}
