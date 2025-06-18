import { IoCloseCircle } from "react-icons/io5";
import VideoPlayer from "../../primitives/VideoPlayer";
import { useEffect, useMemo } from "react";
function VideoComponent({
  file,
  removeFile,
}: {
  file: File;
  removeFile: () => void;
}) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);
  return (
    <div className="relative">
      <VideoPlayer url={url} muted />
      <div className="absolute right-2 top-2 text-2xl">
        <button
          type="button"
          onClick={removeFile}
          className="rounded-full bg-white p-0.5 dark:bg-gray-700"
        >
          <IoCloseCircle />
        </button>
      </div>
    </div>
  );
}

export default VideoComponent;
