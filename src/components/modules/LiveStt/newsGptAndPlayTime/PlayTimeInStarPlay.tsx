import { IoCloseOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useGetStarPlay from "../../../../api/useGetStarPlay";
import { useStarPlayerContext } from "../../../../hooks/useStarPlayerContext";
import CircularLoader from "../../../uiComponents/CircularLoader";
import StarVideoPlayer from "../../StarPlayer/StarVideoPlayer";
import { useEffect } from "react";
const PlayTimeInStarPlay = ({
  setIsStarPlayModalOpen,
  channelName,
  time,
  date,
  source,
}: {
  setIsStarPlayModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
  time: number | string;
  date: string;
  source: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error, isError } = useGetStarPlay({
    channelName,
    time,
    date,
    source,
  });
  useEffect(() => {
    setSearchParams((currentParams) => {
      currentParams.set("isLive", "false");
      return currentParams;
    });
  }, [searchParams, setSearchParams]);

  const { playerRef } = useStarPlayerContext();

  const dataExist = data?.success === true;
  const handleCloseModal = () => {
    setSearchParams((currentParams) => {
      currentParams.delete("isLive");
      return currentParams;
    });
    setIsStarPlayModalOpen(false);
  };

  useEffect(() => {
    if (playerRef?.current && typeof data?.startTime === "number") {
      playerRef.current.currentTime = data.startTime;
    }
  }, [playerRef, data?.startTime]);

  useEffect(() => {
    if (isError && axios.isAxiosError<{ error: string }>(error)) {
      const errMessage = error.response?.data.error ?? error.message;
      toast.error(errMessage);
    }
  }, [isError, error]);

  return (
    <>
      <div className="  h-full max-h-[600px] w-full max-w-[750px] rounded-tl-md rounded-tr-md bg-white dark:bg-gray-800 ">
        <div className="flex  items-center justify-end rounded-tl-md rounded-tr-md bg-gray-200 dark:bg-gray-600 dark:text-white">
          <div
            className="flex items-center justify-center  p-1"
            onClick={handleCloseModal}
          >
            <button className="cursor-pointer">
              <IoCloseOutline size={26} />
            </button>
          </div>
        </div>

        <main className=" grid h-full w-full grid-cols-1  gap-3 rounded-bl-md rounded-br-md py-2">
          {isError && (
            <div className="flex items-center justify-center">
              <h1 className="text-xl text-red-400">Data Not Found</h1>
            </div>
          )}
          {isLoading && (
            <div className="flex w-full items-center justify-center">
              <div className="w-12">
                <CircularLoader />
              </div>
            </div>
          )}

          {dataExist && <StarVideoPlayer src={data.link} isControlsOn={true} />}
        </main>
      </div>
    </>
  );
};

export default PlayTimeInStarPlay;
