import { useClickAway } from "@uidotdev/usehooks";
import { MutableRefObject } from "react";
import SingleViewDictionaryText from "./SingleViewDictionaryText";
import useGetDictionaryData from "../../../api/useGetDictionaryData";
import CircularLoader from "../../uiComponents/CircularLoader";
import useDictionaryContext from "./useDictionaryContext";
// import useGetDictionaryData from "../../../api/useGetDictionaryData";

const ViewDictionaryModal = ({ source }: { source: string }) => {
  const { setIsViewDictionaryModalOpen } = useDictionaryContext();
  const ref = useClickAway(() => {
    setIsViewDictionaryModalOpen(false);
  });
  const { data, isError, isLoading } = useGetDictionaryData();
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div
        className="flex h-2/3 w-1/3 flex-col gap-3  rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-lavender-500">
            View Dictionary
          </h1>
        </div>

        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <div className="w-12">
              <CircularLoader />
            </div>
          </div>
        )}
        {isError && !data && (
          <div className="flex w-full items-center justify-center">
            <h1 className="text-red-400">Something went wrong</h1>
          </div>
        )}
        <div className="flex w-[57vh] items-center justify-center  ">
          <div className="flex w-[50vh] items-center justify-between  ">
            <p className="text-xl font-bold text-lavender-400">Original word</p>
            <p className="text-xl font-bold text-lavender-400">Updated word</p>
          </div>
        </div>
        <div className="overflow-auto">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <SingleViewDictionaryText
                key={key}
                originalWord={key}
                correctedWord={value}
                source={source}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDictionaryModal;
