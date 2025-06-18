import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Portal from "../../primitives/Portal";
import { formatTime, getVideoDuration } from "../../../utils/helpers";
import useProgressStore from "../../../stores/useSttProgress";

const UploadProgressPortal = ({
  selectedFile,
  onCancel,
  setIsProcessing,
}: {
  selectedFile: File;
  onCancel: () => void;
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
}) => {
  const { updateTimeToDownload } = useProgressStore();
  const [videoDuration, setVideoDuration] = useState("");
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // get the videoDuration in seconds.
  getVideoDuration(selectedFile)
    .then((duration) => {
      const time = Math.round(Number(duration));
      const formattedTime = formatTime(time * 2);
      setVideoDuration(formattedTime);
    })
    .catch((error: unknown) => {
      console.error(error);
    });
  const parseDuration = (duration: string) => {
    let totalSeconds = 0;
    const minuteMatch = duration.match(/(\d+) minute/);
    const secondMatch = duration.match(/(\d+) second/);

    if (minuteMatch) {
      totalSeconds += parseInt(minuteMatch[1]) * 60;
    }
    if (secondMatch) {
      totalSeconds += parseInt(secondMatch[1]);
    }

    return totalSeconds;
  };

  useEffect(() => {
    const totalSeconds = parseDuration(videoDuration);
    const countdownInterval = setInterval(() => {
      setElapsedTime((prevTime) => {
        if (prevTime >= totalSeconds) {
          // clearInterval(countdownInterval);
          // console.log("total TIme ", totalSeconds);
          return totalSeconds;
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [videoDuration]);

  useEffect(() => {
    updateTimeToDownload(elapsedTime);
  }, [elapsedTime, updateTimeToDownload]);

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        <div className="flex h-auto w-9/12 flex-col gap-5 rounded-md bg-white px-2 py-2 dark:bg-gray-600">
          <div className="flex w-full items-center justify-between">
            <p className="text-sm font-semibold text-lavender-600">
              Estimated time:{" "}
              <span className="text-lavender-800">{videoDuration}</span>
            </p>
            <p className="text-sm font-semibold text-lavender-600">
              Elapsed time:{" "}
              <span className="text-lavender-800">
                {formatTime(elapsedTime)}
              </span>
            </p>
          </div>
          <div className="flex w-full justify-center">
            <div
              className="background-loader-image absolute h-6 animate-move-arrows rounded-md bg-gray-400"
              style={{ width: "calc(75% - 20px)" }}
            ></div>
          </div>
          <div className="mt-8 flex w-full justify-end">
            <button
              onClick={() => {
                onCancel();
                setIsProcessing(false);
              }}
              className="border-lavander-800 rounded-md border bg-lavender-600 px-2 py-1 text-xs text-white"
            >
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default UploadProgressPortal;
