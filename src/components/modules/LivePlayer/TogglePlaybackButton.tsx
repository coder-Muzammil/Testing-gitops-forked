import { FaPause, FaPlay } from "react-icons/fa";
import { useLivePlayerContext } from "../../../hooks/useLivePlayerContext";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";

export function TogglePlaybackButton() {
  const { playerRef, isPlaying, channel } = useLivePlayerContext();
  const { selectedChannels } = useManageLiveTv();

  const thisChannel = selectedChannels.find((ch) => ch.id === channel.id);
  const isClipExtractionActive = thisChannel?.isClipExtractionActive;
  const left = thisChannel?.clippingData.left ?? 0;
  const duration = playerRef?.current?.duration ?? 0;
  const leftCurrentTime = (left / 100) * duration;

  function handlePlayPause(action: "play" | "pause") {
    if (action === "play") {
      // if current time is not right end means that user has set current time him self by clicking
      const userIsDoingClippingAndCurrentTimeIsNotAndRightEnd =
        isClipExtractionActive && playerRef?.current;
      if (
        playerRef?.current &&
        userIsDoingClippingAndCurrentTimeIsNotAndRightEnd
      ) {
        playerRef.current.currentTime = leftCurrentTime;
      }

      playerRef?.current?.play().catch((error: unknown) => {
        console.error("Error playing video", error);
      });
    } else {
      playerRef?.current?.pause();
    }
  }

  return (
    <div>
      {!isPlaying && (
        <button
          type="button"
          className="flex h-full w-full items-center justify-center text-white"
          onClick={() => {
            handlePlayPause("play");
          }}
        >
          <FaPlay />
        </button>
      )}
      {isPlaying && (
        <button
          type="button"
          className="flex h-full w-full items-center justify-center text-white"
          onClick={() => {
            handlePlayPause("pause");
          }}
        >
          <FaPause />
        </button>
      )}
    </div>
  );
}
