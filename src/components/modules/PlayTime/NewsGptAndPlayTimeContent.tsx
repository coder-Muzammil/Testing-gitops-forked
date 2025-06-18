import HeadlinesTableHeader from "./HeadlinesTableHeader";
import HeadlinesTableBody from "./HeadlinesTableBody";
import { type SingleHeadlineNewsDataType } from "../../../api/useGetHeadlinesNewsData";
import CircularLoader from "../../uiComponents/CircularLoader";
import { useSttLiveContext } from "../LiveStt/useSttLiveContext";
import PlayTimeInStarPlay from "../LiveStt/newsGptAndPlayTime/PlayTimeInStarPlay";
import { twMerge } from "tailwind-merge";

const NewsGptAndPlayTimeContent = ({
  data,
  isLoading,
  isError,
  error,
}: {
  data: Array<SingleHeadlineNewsDataType> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}) => {
  const {
    playTimeSttRecordDataForStarPlay,
    setIsPlayTimeStarPlayModalOpen,
    isPlayTimeStarPlayModalOpen,
  } = useSttLiveContext();
  if (isLoading)
    return (
      <div className="flex items-center justify-center ">
        <div className="h-12 w-12">
          <CircularLoader />
        </div>
      </div>
    );

  if (isError)
    return <div className="text-sm text-red-500">{error?.message}</div>;

  if (!data) return <div className="text-sm text-red-500">Data not found.</div>;

  const headlinesData = data.map((item) => item.data).flat();

  return (
    <div
      className={twMerge(
        "grid h-full gap-2 overflow-hidden ",
        isPlayTimeStarPlayModalOpen
          ? "grid-cols-[4fr_6fr]"
          : "hide-scrollbar grid-cols-1 overflow-auto",
      )}
    >
      {isPlayTimeStarPlayModalOpen && (
        <div className=" flex  items-center justify-center ">
          <PlayTimeInStarPlay
            setIsStarPlayModalOpen={setIsPlayTimeStarPlayModalOpen}
            channelName={playTimeSttRecordDataForStarPlay.channelName}
            time={playTimeSttRecordDataForStarPlay.time}
            date={playTimeSttRecordDataForStarPlay.date}
            source="stt"
          />
        </div>
      )}

      <div
        className={`transition-all ${isPlayTimeStarPlayModalOpen ? "hide-scrollbar overflow-auto border-l-2 border-gray-300 " : ""}`}
      >
        <table className="w-full">
          <HeadlinesTableHeader headlines={headlinesData} />
          <HeadlinesTableBody headLines={data} />
        </table>
      </div>
    </div>
  );
};

export default NewsGptAndPlayTimeContent;
