import { useEffect, useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const SttVideoPlayer = ({
  isSuccess,
  selectedFile,
  onCancelVideo,
}: {
  onCancelVideo: () => void;
  isSuccess: boolean;
  selectedFile: File;
}) => {
  const [onEnterMouse, setOnEnterMouse] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    // TODO: remove unnecessary conditional

    const objectUrl = URL.createObjectURL(selectedFile);
    setVideoSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const playerHeader = (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="absolute left-0 right-0 top-0 flex items-center justify-between rounded-t-md px-2 py-1"
    >
      <p className="text-sm text-white">{selectedFile.name}</p>
      <RxCross2
        size={24}
        color="white"
        cursor={"pointer"}
        onClick={onCancelVideo}
      />
    </div>
  );

  return (
    <div className="max-h-[450px]">
      <div
        onMouseEnter={() => {
          setOnEnterMouse(true);
        }}
        onMouseLeave={() => {
          setOnEnterMouse(false);
        }}
        className="relative h-full rounded-md border border-gray-200"
      >
        {isSuccess ? (
          <>
            <video
              id="sttUploadedVideo"
              className="h-full w-full rounded-md bg-gray-600"
              src={videoSrc}
              autoPlay
              muted={true}
              controls
            />
            {onEnterMouse && playerHeader}
          </>
        ) : (
          <>
            <div className="flex h-full w-full items-center justify-center">
              <FaRegCirclePlay className="h-32 w-32 text-gray-300" />
            </div>
            {playerHeader}
          </>
        )}
      </div>
    </div>
  );
};

export default SttVideoPlayer;
