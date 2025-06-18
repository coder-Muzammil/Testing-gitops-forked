import { StarPlayerCoverageTime } from "./starPlayerContext.types";
import PlayPauseWithDuration from "./Controls/PlayPauseWithDuration";
import PlaybackSpeed from "./Controls/PlaybackSpeed";
import MuteUnMute from "./Controls/MuteUnMute";
import ProgressSeekbar from "./Controls/ProgressSeekbar";
import ProgressCoverageSegments from "./Controls/ProgressCoverageSegments";
import { useStarPlayerContext } from "../../../hooks/useStarPlayerContext";
import ForwardBackwarButtons from "./Controls/ForwardBackwarButtons";

const StarPlayerControls = ({
  intervals,
}: {
  intervals: Array<StarPlayerCoverageTime>;
}) => {
  const { duration } = useStarPlayerContext();

  const isGreaterInterval = intervals.some((interval) => {
    return duration > 0 ? interval.endTime > duration : false;
  });
  return (
    <div className="flex h-auto w-full flex-col gap-3 rounded-md bg-gray-100 px-4 py-3">
      <div className="flex w-full items-center justify-between gap-3">
        <PlayPauseWithDuration />

        {isGreaterInterval && (
          <p className="w-fit text-sm font-semibold text-red-400">
            ERROR: Some intervals are greater then total duration of video.
          </p>
        )}

        <div className="flex items-center gap-3">
          <ForwardBackwarButtons intervals={intervals} />
          <PlaybackSpeed />
          <MuteUnMute />
        </div>
      </div>
      <ProgressSeekbar />
      <ProgressCoverageSegments intervals={intervals} />
    </div>
  );
};

export default StarPlayerControls;
