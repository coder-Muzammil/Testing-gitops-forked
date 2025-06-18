import useGetLiveTranscriptions from "../../../../api/useGetLiveTranscriptions";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import CircularLoader from "../../../uiComponents/CircularLoader";
import placeholderLoading from "../../../../assets/placeholder-loading-collages.png";
import { useSttLiveContext } from "../useSttLiveContext";
import { twMerge } from "tailwind-merge";
import PlayTimeInStarPlay from "../newsGptAndPlayTime/PlayTimeInStarPlay";
import { useSearchParams } from "react-router-dom";
import SttContentTableHeader from "./SttContentTableHeader";
import SttDataViewContentTable from "./SttDataViewContentTable";
import SttContentTableHeaderData from "./SttContentTableHeaderData";
import SttContentTableDataBody from "./SttContentTableDataBody";

function SttContentTable() {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLiveTranscriptions();

  const {
    setTranscriptionsIdsForApplyDictionary,
    playTimeSttRecordDataForStarPlay,
    isStarPlayModalOpen,
    setIsStarPlayModalOpen,
  } = useSttLiveContext();

  const [searchParams] = useSearchParams();
  const isSort = Boolean(!searchParams.get("revSort"));

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    root: null,
  });

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 5;
    }
  }, []);

  useEffect(() => {
    if (data?.pages.length === 1 && isSort && tableContainerRef.current) {
      const container = tableContainerRef.current;

      container.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
  }, [isSort, data]);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch((error: unknown) => {
        toast.error("Error fetching next page");
        console.error(error);
      });
    }
    const transcriptionIds = data?.pages
      .flatMap((page) => page.results)
      .map((item) => item.transcriptionId);

    if (transcriptionIds) {
      setTranscriptionsIdsForApplyDictionary(transcriptionIds);
    }
  }, [
    data?.pages,
    setTranscriptionsIdsForApplyDictionary,
    entry,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  function handleLoadMoreData() {
    fetchNextPage().catch((error: unknown) => {
      toast.error("Error fetching next page");
      console.error(error);
    });
  }

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

  const sttData = pages.flatMap((page) => page.results);

  const sttDataMap = new Map();

  for (const sttRecord of sttData) {
    if (sttDataMap.has(sttRecord.transcriptionId)) {
      continue;
    }

    sttDataMap.set(sttRecord.transcriptionId, sttRecord);
  }

  return (
    <div
      className={twMerge(
        " overflow-auto",
        isStarPlayModalOpen && "grid grid-cols-[4fr_6fr] gap-2 overflow-hidden",
        isSort && "overflow-hidden",
      )}
    >
      {isStarPlayModalOpen && (
        <PlayTimeInStarPlay
          setIsStarPlayModalOpen={setIsStarPlayModalOpen}
          channelName={playTimeSttRecordDataForStarPlay.channelName}
          time={playTimeSttRecordDataForStarPlay.time}
          date={playTimeSttRecordDataForStarPlay.date}
          source="stt"
        />
      )}

      <div
        ref={tableContainerRef}
        className={twMerge(
          isStarPlayModalOpen && " overflow-auto",
          isSort &&
            " flex max-h-[calc(100vh-250px)] min-w-[1200px] flex-col-reverse gap-4 overflow-auto px-1 pb-3 md:max-h-[calc(100vh-230px)]",
        )}
      >
        {isSort ? (
          <>
            <SttContentTableDataBody sttData={[...sttDataMap.values()]} />
            <div className="flex items-center justify-center">
              {!hasNextPage && sttData.length !== 0 && !isFetchingNextPage ? (
                <p className="w-full text-center">No more data.</p>
              ) : (
                <button
                  type="button"
                  className="rounded-md bg-lavender-600 px-4 py-1 text-white hover:bg-lavender-500 disabled:cursor-not-allowed disabled:bg-lavender-400"
                  onClick={handleLoadMoreData}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading . . ." : " Load More . . ."}
                </button>
              )}
            </div>
            <SttContentTableHeaderData sttData={[...sttDataMap.values()]} />
          </>
        ) : (
          <>
            <table className="w-full">
              <SttContentTableHeader sttData={[...sttDataMap.values()]} />
              <SttDataViewContentTable
                sttData={[...sttDataMap.values()]}
                isLoading={isLoading}
                isSort={isSort}
                onLoadMoreClick={handleLoadMoreData}
                hasNextPage={hasNextPage}
              />
            </table>
            <LoadMoreData
              observerRef={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              dataLength={sttData.length}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default SttContentTable;

export function LoadMoreData({
  observerRef,
  hasNextPage,
  isFetchingNextPage,
  dataLength,
}: {
  observerRef: (node: HTMLDivElement | null) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  dataLength: number;
}) {
  return (
    <div className="mt-10 h-10" ref={observerRef}>
      {hasNextPage && isFetchingNextPage && (
        <div className="flex w-full items-center justify-center">
          <div className="w-12">
            <CircularLoader />
          </div>
        </div>
      )}
      {!hasNextPage && dataLength !== 0 && !isFetchingNextPage && (
        <p className="my-5 text-center">No more data.</p>
      )}
    </div>
  );
}
