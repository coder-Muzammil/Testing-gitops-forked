import { useIntersectionObserver } from "@uidotdev/usehooks";
import useGetMosaics from "../../../api/useGetMosaics";
import CircularLoader from "../../uiComponents/CircularLoader";
import SingleMosaicCard from "../flashers/SingleMosaicCard";
import { useEffect } from "react";
import toast from "react-hot-toast";
import placeholderImage from "../../../assets/placeholder-loading-collages.png";

function Mosaics({ myTeamMosaics }: { myTeamMosaics: boolean }) {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetMosaics({ myTeamMosaics });

  const allMosaics = data?.pages.flatMap((page) => page.results);

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

  // note: if remove isLoading in future then configure bottom loader and 'no more data' to only display if isLoading is false
  if (isLoading) {
    return (
      <div className="space-y-4 opacity-40">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <img
              key={index}
              src={placeholderImage}
              alt="placeholder"
              className="w-full animate-pulse"
            />
          );
        })}
      </div>
    );
  }

  if (allMosaics?.length === 0) {
    return (
      <div className="flex w-full items-center justify-center ">
        No Collage found
      </div>
    );
  }

  // note: if remove isError in future then configure bottom loader and 'no more data' to only display if isError is false
  if (isError) {
    return (
      <div className="flex w-full items-center justify-center text-red-400">
        {error.message}
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      {allMosaics?.map((singleMosaic, index) => {
        return (
          <SingleMosaicCard
            singleMosaic={singleMosaic}
            key={index}
            myTeamMosaics={myTeamMosaics}
          />
        );
      })}

      <div className="flex items-center justify-center">
        <div className="h-10 w-10" ref={ref}>
          {hasNextPage && isFetchingNextPage && (
            <div className="flex w-full items-center justify-center">
              <div className="w-12">
                <CircularLoader />
              </div>
            </div>
          )}
          {!hasNextPage && allMosaics?.length === 0 && !isFetchingNextPage && (
            <p className="my-5 text-center">No more data.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Mosaics;
