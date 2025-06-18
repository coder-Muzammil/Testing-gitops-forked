import { IoPause, IoPlay } from "react-icons/io5";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { useEffect } from "react";
import { useStarPlayerContext } from "../../../../hooks/useStarPlayerContext";

const PlayPauseWithDuration = () => {
  const { playerRef, isPlaying, setIsPlaying, currentTime, duration } =
    useStarPlayerContext();
  const { secondsToTimeString } = useDateTimeUtils();

  useEffect(() => {
    const playerRefCurrent = playerRef?.current;
    const handlePlay = () => {setIsPlaying(true)};
    const handlePause = () => {setIsPlaying(false)};

    if (playerRefCurrent) {
      playerRefCurrent.addEventListener("pause", handlePause);
      playerRefCurrent.addEventListener("play", handlePlay);
    }

    return () => {
      if (playerRefCurrent) {
        playerRefCurrent.removeEventListener("pause", handlePause);
        playerRefCurrent.removeEventListener("play", handlePlay);
      }
    };
  }, [playerRef, setIsPlaying]);

  const togglePlayPause = () => {
    if (playerRef?.current) {
      if (isPlaying) {
        playerRef.current.pause();
        setIsPlaying(false);
      } else {
        playerRef.current.play().catch(() => {
          console.error("Error playing video");
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={togglePlayPause} className="cursor-pointer text-2xl">
        {!isPlaying ? <IoPlay /> : <IoPause />}
      </button>
      <span>
        {" "}
        {secondsToTimeString(currentTime)}
        {duration && <span> / {secondsToTimeString(duration)}</span>}
      </span>
    </div>
  );
};

export default PlayPauseWithDuration;
