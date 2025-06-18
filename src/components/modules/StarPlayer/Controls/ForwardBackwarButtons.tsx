import { useStarPlayerContext } from "../../../../hooks/useStarPlayerContext";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { StarPlayerCoverageTime } from "../starPlayerContext.types";
const ForwardBackwarButtons = ({
  intervals,
}: {
  intervals: Array<StarPlayerCoverageTime>;
}) => {
  const { playerRef, currentSegmentIndex, setCurrentSegmentIndex } =
    useStarPlayerContext();

  const moveForward = () => {
    if (currentSegmentIndex < intervals.length - 1) {
      setCurrentSegmentIndex(currentSegmentIndex + 1);
    }
  };
  const moveBackward = () => {
    if (playerRef?.current && currentSegmentIndex > 0) {
      setCurrentSegmentIndex(currentSegmentIndex - 1);
    }
  };
  return (
    <div className="flex items-center ">
      <div
        className=" cursor-pointer rounded-full hover:scale-110 hover:bg-gray-200"
        title="Previous Chunk"
      >
        <IoPlaySkipBackOutline size={24} onClick={moveBackward} />
      </div>
      <div
        className=" cursor-pointer rounded-full hover:scale-110 hover:bg-gray-200"
        title="Next Chunk"
      >
        <IoPlaySkipForwardOutline size={24} onClick={moveForward} />
      </div>
    </div>
  );
};
export default ForwardBackwarButtons;
