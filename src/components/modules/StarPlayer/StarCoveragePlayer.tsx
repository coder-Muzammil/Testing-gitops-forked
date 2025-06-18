import StarVideoPlayer from "./StarVideoPlayer";
import StarPlayerControls from "./StarPlayerControls";
import { useEffect } from "react";
import { StreamIntervalType } from "../../../api/responseTypes/useGetThumbnailApi.types";
import { useStarPlayerContext } from "../../../hooks/useStarPlayerContext";

const StarCoveragePlayer = ({
  streamInterval,
  liveLink,
}: {
  streamInterval: Array<StreamIntervalType>;
  liveLink: string;
}) => {
  const {
    playerRef,
    currentSegmentIndex,
    setCurrentSegmentIndex,
    setCoverageTime,
    duration,
    setDuration,
    setProgress,
    setCurrentTime,
  } = useStarPlayerContext();

  // console.log({
  //   link: liveLink,
  //   intervals: streamInterval,
  // });
  useEffect(() => {
    const playerRefCurrent = playerRef?.current;
    const handleLoadedMetadata = () => {
      if (playerRefCurrent) {
        setDuration(playerRefCurrent.duration);
      }
    };

    if (playerRefCurrent) {
      playerRefCurrent.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (playerRefCurrent) {
        playerRefCurrent.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
      }
    };
  }, [playerRef, duration, setDuration]);

  useEffect(() => {
    const videoPlayer = playerRef?.current;
    if (!videoPlayer) return;

    videoPlayer.currentTime = streamInterval[currentSegmentIndex].startTime;
    const onTimeUpdate = () => {
      setDuration(videoPlayer.duration);
      const currentTime = Math.floor(videoPlayer.currentTime);
      setCurrentTime(Number(videoPlayer.currentTime));
      setCoverageTime(streamInterval[currentSegmentIndex]);
      setProgress((videoPlayer.currentTime / duration) * 100);
      const { endTime } = streamInterval[currentSegmentIndex];

      if (currentTime >= endTime) {
        const nextSegmentIndex = currentSegmentIndex + 1;
        if (nextSegmentIndex < streamInterval.length) {
          setCurrentSegmentIndex(nextSegmentIndex);
          videoPlayer.currentTime = streamInterval[nextSegmentIndex].startTime;
        } else {
          videoPlayer.pause();
        }
      }
    };

    videoPlayer.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      videoPlayer.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [
    currentSegmentIndex,
    setCoverageTime,
    setCurrentSegmentIndex,
    streamInterval,
    setDuration,
    playerRef,
    duration,
    setProgress,
    setCurrentTime,
  ]);
  if (!playerRef) {
    return null;
  }
  return (
    <main className="grid h-full w-full grid-rows-[1fr_auto] gap-3 py-2">
      <StarVideoPlayer src={liveLink} isControlsOn={false} />
      <StarPlayerControls intervals={streamInterval} />
    </main>
  );
};
export default StarCoveragePlayer;
