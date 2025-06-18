import FlasherTableHeader from "./FlasherTableHeader";
import FlasherTableBody from "./FlasherTableBody";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import CircularLoader from "../../uiComponents/CircularLoader";
import useGetAllFlashers from "../../../api/useGetAllFlashers";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import PlayTimeInStarPlay from "../LiveStt/newsGptAndPlayTime/PlayTimeInStarPlay";
import useFlasherContext from "./useFlasherContext";
function FlashersDataTable() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetAllFlashers();
  const { isStarPlayModalOpen, starPlayData, setIsStarPlayModalOpen } =
    useFlasherContext();
  const flasherRef = useRef<HTMLDivElement>(null);
  const flashers = data?.pages.flatMap((page) => page.results);
  const flashersMap = new Map();

  for (const flasher of flashers ?? []) {
    if (flashersMap.has(flasher.recordId)) {
      continue;
    }

    flashersMap.set(flasher.recordId, flasher);
  }
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    root: null,
  });

  useEffect(() => {
    if (
      entry?.isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isPending
    ) {
      console.log({
        entry,
        hasNextPage,
        isFetchingNextPage,
        plot: "tickers",
      });
      fetchNextPage().catch(() => {
        toast.error("Failed to fetch more tickers");
      });
    }
  }, [
    entry,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    flashers,
    isPending,
  ]);
  function handleFetchNextPage() {
    fetchNextPage().catch((error: unknown) => {
      toast.error("Error fetching next page");
      console.error(error);
    });
  }

  const onScrollToFlasher = (recordId: number) => {
    const element = document.getElementById(`flasher-row-${String(recordId)}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    while (hasNextPage) {
      handleFetchNextPage();
      const element = document.getElementById(
        `flasher-row-${String(recordId)}`,
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
  };
  const flashersPositionOnStarPlayOpen = (recordId: number) => {
    const element = document.getElementById(`flasher-row-${String(recordId)}`);
    if (element) {
      element.scrollIntoView({
        inline: "nearest",
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <div
      className={twMerge(
        "grid h-full gap-2 overflow-hidden ",
        isStarPlayModalOpen
          ? "grid-cols-[4fr_6fr] "
          : " grid-cols-1 overflow-auto",
      )}
    >
      {isStarPlayModalOpen && (
        <PlayTimeInStarPlay
          setIsStarPlayModalOpen={setIsStarPlayModalOpen}
          channelName={starPlayData.channelName}
          time={starPlayData.time}
          date={starPlayData.date}
          source="flasher"
        />
      )}
      <div
        ref={flasherRef}
        className={`transition-all ${isStarPlayModalOpen ? "overflow-auto border-l-2 border-gray-300 " : ""}`}
      >
        <div className="space-y-2 pr-3 ">
          <table className="w-full bg-white text-gray-500 dark:bg-gray-800 dark:text-white">
            <FlasherTableHeader flashers={[...flashersMap.values()]} />
            <FlasherTableBody
              isLoading={isLoading}
              isError={isError}
              flashers={[...flashersMap.values()]}
              error={error}
              onScrollToFlasher={onScrollToFlasher}
              flashersPositionOnStarPlayOpen={flashersPositionOnStarPlayOpen}
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
            {!hasNextPage && flashers?.length !== 0 && !isFetchingNextPage && (
              <p className="my-5 text-center">No more data.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FlashersDataTable;
