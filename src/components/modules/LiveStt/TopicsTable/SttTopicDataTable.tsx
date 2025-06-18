import { useIntersectionObserver } from "@uidotdev/usehooks";
import useGetSttLiveTopics from "../../../../api/useGetSttLiveTopics";
import { useEffect } from "react";
import toast from "react-hot-toast";
import placeholderLoading from "../../../../assets/placeholder-loading-stt.png";
import CircularLoader from "../../../uiComponents/CircularLoader";
import SttTopicModlingTableHeader from "./SttTopicModlingTableHeader";
import SttTopicModlingDataViewTable from "./SttTopicModlingDataViewTable";

const SttTopicDataTable = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSttLiveTopics();

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    root: null,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch((error: unknown) => {
        toast.error("Error fetching next page");
        console.error(error);
      });
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div className="">
        <div className="space-y-4 opacity-40 ">
          <img
            src={placeholderLoading}
            alt="loading"
            className="w-full animate-pulse"
          />
          <img
            src={placeholderLoading}
            alt="loading"
            className="w-full animate-pulse"
          />
          <img
            src={placeholderLoading}
            alt="loading"
            className="w-full animate-pulse"
          />
        </div>
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  if (!data) return <div>No data found</div>;

  const { pages } = data;

  const sttTopicData = pages.flatMap((page) => page.results);
  if (sttTopicData.length === 0) {
    return (
      <div className="flex w-full items-center justify-center ">
        <p className="my-5 text-center">No data found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-auto">
        <table className=" w-full">
          <SttTopicModlingTableHeader sttTopicData={sttTopicData} />
          <SttTopicModlingDataViewTable
            sttTopicData={sttTopicData}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        </table>

        <div className="mt-10 h-10" ref={ref}>
          {hasNextPage && isFetchingNextPage && (
            <div className="flex w-full items-center justify-center">
              <div className="w-12">
                <CircularLoader />
              </div>
            </div>
          )}
          {!hasNextPage && sttTopicData.length !== 0 && !isFetchingNextPage && (
            <p className="my-5 text-center">No more data.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SttTopicDataTable;
