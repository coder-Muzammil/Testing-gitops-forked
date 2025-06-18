import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import SearchbarSearchParams from "../components/modules/MyClips/SearchbarSearchParams";
import ClipsGrid from "../components/modules/MyClips/ClipsGrid";
import { useGetMyClips } from "../api/useGetMyClips";

function MyClips() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
  } = useGetMyClips({ getTeamClips: false });

  const myClips = data?.pages.flatMap((page) => page.results);

  function handleFetchNextPage() {
    fetchNextPage().catch((error: unknown) => {
      console.error(error);
    });
  }
  return (
    <OutletMainContainer>
      <div className=" grid grid-rows-[auto_auto_1fr] gap-4 ">
        <h1 className="text-center text-xl font-bold tracking-wider text-lavender-500 underline ">
          Your Clips
        </h1>
        <div className="w-1/3">
          <SearchbarSearchParams />
        </div>
        <div className=" hide-scrollbar overflow-y-auto">
          <ClipsGrid
            isLoading={isLoading}
            isError={isError}
            error={error}
            myClips={myClips}
            fetchNextPage={handleFetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
    </OutletMainContainer>
  );
}
export default MyClips;
