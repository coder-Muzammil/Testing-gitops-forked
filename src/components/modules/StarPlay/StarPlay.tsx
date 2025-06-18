import { IoCloseOutline } from "react-icons/io5";
import Portal from "../../primitives/Portal";
import StarVideoPlayer from "../StarPlayer/StarVideoPlayer";
import { useStarPlayerContext } from "../../../hooks/useStarPlayerContext";
import { MutableRefObject, useEffect } from "react";
import useGetStarPlay from "../../../api/useGetStarPlay";
import CircularLoader from "../../uiComponents/CircularLoader";
import { useClickAway } from "@uidotdev/usehooks";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const StarPlay = ({
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
  const ref = useClickAway(() => {
    setIsStarPlayModalOpen(false);
    setSearchParams((currentParams) => {
      currentParams.delete("isLive");
      return currentParams;
    });
  });
  const { playerRef } = useStarPlayerContext();
  // useEffect(() => {
  //   if (playerRef?.current) {
  //     if (typeof data?.startTime === "number") {
  //       playerRef.current.currentTime = data.startTime;
  //     }

  //     const handleTimeUpdate = () => {
  //       if (
  //         playerRef.current &&
  //         playerRef.current.currentTime >= (data?.startTime ?? 0)
  //       ) {
  //         playerRef.current.pause();
  //       }
  //     };

  //     playerRef.current.addEventListener("timeupdate", handleTimeUpdate);
  //     return () => {
  //       if (playerRef.current) {
  //         playerRef.current.removeEventListener("timeupdate", handleTimeUpdate);
  //       }
  //     };
  //   }
  // }, [playerRef]);
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
  let errMessage = "";

  if (isError && axios.isAxiosError<{ error: string }>(error)) {
    errMessage = error.response?.data.error ?? error.message;
    toast.error(errMessage);
  }
  return (
    <>
      <Portal>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div
            ref={ref as MutableRefObject<HTMLDivElement>}
            className=" z-50 h-1/2 max-h-[450px] w-1/2 max-w-[600px] rounded-tl-md rounded-tr-md bg-white  dark:bg-gray-700"
          >
            <div className="flex  items-center justify-end rounded-tl-md rounded-tr-md bg-white dark:bg-gray-700 ">
              <div
                className="flex items-center justify-center  p-1"
                onClick={handleCloseModal}
              >
                <button className="cursor-pointer dark:text-red-500">
                  <IoCloseOutline size={26} />
                </button>
              </div>
            </div>

            <main className=" grid h-full w-full grid-cols-1  gap-3 rounded-bl-md rounded-br-md py-2">
              {isError && (
                <div className="flex items-center justify-center">
                  <h1 className="text-xl text-red-400">{errMessage}</h1>
                </div>
              )}
              {data?.success === false && (
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

              {dataExist && (
                <StarVideoPlayer src={data.link} isControlsOn={true} />
              )}
            </main>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default StarPlay;
