import placeholderImage from "../../../assets/placeholder-loading-fr-dashboard.png";
import TickersTableHeader from "./TickersTableHeader";
import TickersTableBody from "./TickersTableBody";
import useGetAllTickers from "../../../api/useGetAllTickers";
import toast from "react-hot-toast";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import CircularLoader from "../../uiComponents/CircularLoader";
import useTickersContext from "./useTickersContext";
import PlayTimeInStarPlay from "../LiveStt/newsGptAndPlayTime/PlayTimeInStarPlay";
import { twMerge } from "tailwind-merge";

const TickersDataTable = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
  } = useGetAllTickers();
  const { isStarPlayModalOpen, starPlayData, setIsStarPlayModalOpen } =
    useTickersContext();
  const tickers = data?.pages.flatMap((page) => page.results) ?? [];

  const tickersMap = new Map();

  for (const ticker of tickers) {
    if (tickersMap.has(ticker.recordId)) {
      continue;
    }

    tickersMap.set(ticker.recordId, ticker);
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
      fetchNextPage().catch(() => {
        toast.error("Failed to fetch more tickers");
      });
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage, isPending]);

  if (isLoading) {
    return (
      <div className=" w-full space-y-4 opacity-40">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div key={index} className="">
              <img
                src={placeholderImage}
                alt="placeholder"
                className="w-full animate-pulse"
              />
            </div>
          );
        })}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex w-full items-center justify-center text-red-400">
        Something went wrong...
      </div>
    );
  }

  if (tickers.length === 0) {
    return (
      <div className="flex w-full items-center justify-center ">
        No tickers found
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "grid h-full gap-2 overflow-hidden ",
        isStarPlayModalOpen
          ? "grid-cols-[4fr_6fr]"
          : " grid-cols-1 overflow-auto",
      )}
    >
      {isStarPlayModalOpen && (
        <PlayTimeInStarPlay
          setIsStarPlayModalOpen={setIsStarPlayModalOpen}
          channelName={starPlayData.channelName}
          time={starPlayData.time}
          date={starPlayData.date}
          source="ticker"
        />
      )}
      <div
        className={`transition-all ${isStarPlayModalOpen ? " overflow-auto border-l-2 border-gray-300 " : ""}`}
      >
        <table className="w-full bg-white text-gray-500 dark:bg-slate-800 dark:text-white">
          <TickersTableHeader tickers={[...tickersMap.values()]} />
          <TickersTableBody
            isLoading={isLoading}
            isError={isError}
            tickers={[...tickersMap.values()]}
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
          {!hasNextPage && tickers.length !== 0 && !isFetchingNextPage && (
            <p className="my-5 text-center">No more data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TickersDataTable;
