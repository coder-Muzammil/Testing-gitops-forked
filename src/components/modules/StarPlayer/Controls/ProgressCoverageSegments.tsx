import { useStarPlayerContext } from "../../../../hooks/useStarPlayerContext";
import { StarPlayerCoverageTime } from "../starPlayerContext.types";

const ProgressCoverageSegments = ({
  intervals,
}: {
  intervals: Array<StarPlayerCoverageTime>;
}) => {
  const {
    playerRef,
    setCoverageTime,
    setProgress,
    setCurrentSegmentIndex,
    duration,
    setCurrentTime,
  } = useStarPlayerContext();

  return (
    <div className="relative h-3 w-full rounded-sm bg-gray-300">
      {intervals.map((item, index) => {
        if (playerRef?.current) {
          const itemDuration = item.endTime - item.startTime;
          const widthPercentage =
            (itemDuration / playerRef.current.duration) * 100;
          const leftPercentage =
            (item.startTime / playerRef.current.duration) * 100;

          // console.log(item.startTime, item.endTime, "totalDuration", Math.floor(duration));
          return (
            <div
              key={`${item.startTime.toString()}-${index.toString()}`}
              className="absolute  h-full cursor-pointer rounded-sm bg-lavender-500"
              onClick={(e) => {
                if (playerRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  const seekTime =
                    (item.endTime - item.startTime) * (percentage / 100) +
                    item.startTime;

                  playerRef.current.currentTime = seekTime;
                  setCoverageTime(item);
                  setCurrentTime(item.startTime);
                  setProgress((playerRef.current.currentTime / duration) * 100);
                  setCurrentSegmentIndex(index);
                }
              }}
              style={{
                width: `${widthPercentage.toString()}%`,
                left: `${leftPercentage.toString()}%`,
              }}
            ></div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ProgressCoverageSegments;
