import { useIntersectionObserver } from "@uidotdev/usehooks";
import ClipCard from "./ClipCard";
import { useEffect } from "react";
import CircularLoader from "../../uiComponents/CircularLoader";
import { SingleClipType } from "../../../api/responseTypes/getMyClipsApi.types";
import placeholder from "../../../assets/placeholder-loading-clips.png";

function ClipsGrid({
  isLoading,
  isError,
  myClips,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  isLoading: boolean;
  isError: boolean;
  myClips: Array<SingleClipType> | undefined;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    root: null,
  });
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);
  if (isLoading) {
    return (
      <div className="grid content-start w-full grid-cols-1 gap-4 px-1 py-1 opacity-40 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <img
              key={index}
              src={placeholder}
              alt="placeholder"
              className="animate-pulse"
            />
          );
        })}
      </div>
    );
  }

  if (!myClips) {
    return;
  }

  if (myClips.length === 0) {
    return (
      <div className="flex items-center justify-center w-full ">
        No Clips found
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="flex items-center justify-center w-full text-red-400">
        {error.message}
      </div>
    );
  }
  return (
    <>
      <div
        className="grid content-start w-full grid-cols-1 gap-4 px-1 py-1 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        style={{ scrollbarWidth: "thin" }}
      >
        {myClips.map((clip) => {
          return <ClipCard key={clip.clipId} clipData={clip} />;
        })}
      </div>
      <div className="h-10 mt-10" ref={ref}>
        {hasNextPage && isFetchingNextPage && (
          <div className="flex items-center justify-center w-full">
            <div className="w-12">
              <CircularLoader />
            </div>
          </div>
        )}
        {!hasNextPage && myClips.length !== 0 && !isFetchingNextPage && (
          <p className="my-5 text-center">No more data.</p>
        )}
      </div>
    </>
  );
}

export default ClipsGrid;
