import { useLivePlayerContext } from "../../../hooks/useLivePlayerContext";
import { useEffect } from "react";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import { FaExpand } from "react-icons/fa6";
import AddToPlaylistButton from "./AddToPlaylistButton";
import { TogglePlaybackButton } from "./TogglePlaybackButton";
import { useState } from "react";
import SetTimeInterval from "./timeInterval/SetTimeInterval";
function PlayerControls() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 translate-y-[calc(100%+1rem)] bg-black/50 transition-all group-hover:translate-y-0 2xl:h-16">
      <div className="grid h-full w-full grid-rows-[auto_1fr]">
        <Seekbar />
        <div className="flex h-full w-full items-center justify-between gap-4 px-6">
          <Time />
          <TogglePlaybackButton />
          <div className="flex items-center gap-2">
            <SetTimeInterval />
            <AddToPlaylistButton />
            <FullscreenButton />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlayerControls;

function FullscreenButton() {
  const { playerRef } = useLivePlayerContext();

  function handleFullscreen() {
    if (playerRef?.current && "requestFullscreen" in playerRef.current) {
      playerRef.current.requestFullscreen().catch((error: unknown) => {
        console.error("Error entering fullscreen", error);
      });
    }
  }
  return (
    <button type="button" className="text-white" onClick={handleFullscreen}>
      <FaExpand />
    </button>
  );
}

function Time() {
  const { currentTime, playerRef } = useLivePlayerContext();
  const { secondsTo12HourTimeFormat } = useDateTimeUtils();

  const duration = playerRef?.current?.duration;

  const currentTimeString = secondsTo12HourTimeFormat(currentTime);

  return (
    <div className="text-white">
      {currentTimeString}
      {duration && <span> / {secondsTo12HourTimeFormat(duration)}</span>}
    </div>
  );
}

function Seekbar() {
  const { playerRef, currentTime, setCurrentTime } = useLivePlayerContext();
  const { secondsTo12HourTimeFormat } = useDateTimeUtils();

  const [isHovered, setIsHovered] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [, setSeekbarWidth] = useState(0);

  useEffect(() => {
    const videoPlayer = playerRef?.current;

    function updateCurrentTime() {
      setCurrentTime(videoPlayer?.currentTime ?? 0);
    }

    videoPlayer?.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      videoPlayer?.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [playerRef, setCurrentTime]);

  const duration = playerRef?.current?.duration ?? 0;

  function handleMouseMove(event: React.MouseEvent<HTMLInputElement>) {
    if (!playerRef?.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setSeekbarWidth(rect.width);

    const percent = (event.clientX - rect.left) / rect.width;
    const time = Math.min(Math.max(percent * duration, 0), duration);

    setHoverTime(time);

    const tooltipX = Math.min(
      Math.max(event.clientX - rect.left, 40),
      rect.width - 40,
    );

    setTooltipPosition(tooltipX);
  }

  return (
    <div className="relative flex w-full items-center gap-2">
      {isHovered && (
        <div
          className="absolute bottom-10 rounded bg-black px-2 py-1 text-xs text-white"
          style={{
            left: `${tooltipPosition.toString()}px`,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          {secondsTo12HourTimeFormat(hoverTime)}
        </div>
      )}

      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={(event) => {
          let newTime = (duration / 100) * Number(event.target.value);
          if (playerRef?.current) {
            if (newTime >= duration - 5) {
              newTime = duration - 5;
            }
            playerRef.current.currentTime = newTime;
          }
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onMouseMove={handleMouseMove}
        className="h-3 w-full bg-gray-300 accent-lavender-600"
      />
    </div>
  );
}
