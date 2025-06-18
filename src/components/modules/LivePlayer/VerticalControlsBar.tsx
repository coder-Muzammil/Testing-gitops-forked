import { twMerge } from "tailwind-merge";
import { useLivePlayerContext } from "../../../hooks/useLivePlayerContext";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import { IoMdCut } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Hls from "hls.js";
import StreamHourPlay from "./StreamHourPlay";

function VerticalControlsBar({channelId}: {channelId: number}) {
  return (
    <div className="absolute right-3 top-10 flex items-center transition-all">
      <div className="flex h-full flex-col justify-between gap-2 rounded-md border border-white/20 bg-gray-500/50 px-1 py-1">
        <LiveButton />
        <ClippingButton />
        <PlaybackCalendarButton />
        <StreamHourPlay channelId={channelId} />
      </div>
    </div>
  );
}
export default VerticalControlsBar;

function LiveButton() {
  const { channel, playerRef, hls } = useLivePlayerContext();
  const { selectedChannels, setToLive } = useManageLiveTv();
  const { liveLink } = channel;

  const thisChannel = selectedChannels.find((c) => c.id === channel.id);

  const isLive = thisChannel?.nowPlaying === "live";

  const currentTime = playerRef?.current?.currentTime ?? 0;
  const duration = playerRef?.current?.duration ?? 0;

  const isAtEnd = currentTime >= duration - 30;

  function handlePlayLive() {
    if (playerRef?.current) {
      if (!isLive) {
        setToLive(channel.id);
        if (hls) {
          hls.loadSource(liveLink);
          hls.attachMedia(playerRef.current as HTMLMediaElement);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (!playerRef.current) return;
            playerRef.current.currentTime = duration - 30;
            playerRef.current.play().catch((error: unknown) => {
              console.error("Error playing videoo", error);
            });
          });
        }
        return;
      }

      playerRef.current.currentTime = duration - 30;
      playerRef.current.play().catch(() => {
        console.error("Error playing video");
      });
    }
  }

  return (
    <button
      type="button"
      className={twMerge(
        "select-none rounded-sm bg-red-500 px-1 py-0.5 text-xs text-white 2xl:px-4 2xl:py-2",
        !isLive && "bg-gray-500",
        !isAtEnd && "bg-gray-500",
      )}
      disabled={isLive && isAtEnd}
      title="Play live"
      onClick={handlePlayLive}
    >
      <p className="">&#x2022; live</p>
    </button>
  );
}

function ClippingButton() {
  const { channel, playerRef } = useLivePlayerContext();
  const { selectedChannels, setClipExtractionActive } = useManageLiveTv();

  const thisChannel = selectedChannels.find((ch) => ch.id === channel.id);

  function handleClippingButtonClick() {
    const currentState = thisChannel?.isClipExtractionActive;

    if (playerRef?.current) {
      if (!thisChannel?.isClipExtractionActive) {
        playerRef.current.currentTime = 0;

        playerRef.current.pause();
      } else {
        const videoDuration = playerRef.current.duration;
        // -8 to avoid the video ending because last chunk is in buffering
        playerRef.current.currentTime = videoDuration - 8;
        playerRef.current.play().catch(() => {
          console.error("Error playing video");
        });
      }
    }

    const newState = !currentState;

    setClipExtractionActive(channel.id, newState);
  }

  return (
    <button
      type="button"
      className={twMerge(
        "flex justify-center rounded-sm border border-white py-0.5 text-sm text-white transition-all hover:bg-white/50 hover:text-black 2xl:px-4 2xl:py-2",
        thisChannel?.isClipExtractionActive &&
          "border-green-500 bg-green-500 hover:bg-green-500",
      )}
      onClick={handleClippingButtonClick}
      title="Extract Clip"
      disabled={thisChannel?.isClipExtractionActive}
    >
      <IoMdCut />
    </button>
  );
}

function PlaybackCalendarButton() {
  const {
    isPlaybackDatePickerModalActive,
    setIsPlaybackDatePickerModalActive,
    channel,
  } = useLivePlayerContext();
  const { selectedChannels } = useManageLiveTv();

  const thisChannel = selectedChannels.find((c) => c.id === channel.id);

  const isClippingActive = thisChannel?.isClipExtractionActive;

  function handlePlaybackDatePickerModal() {
    if (isClippingActive) {
      toast("Please cancel the clip extraction to set the playback date");
      return;
    }

    setIsPlaybackDatePickerModalActive(!isPlaybackDatePickerModalActive);
  }

  return (
    <button
      type="button"
      className={twMerge(
        "flex justify-center rounded-sm border border-white py-0.5 text-sm text-white transition-all hover:bg-white/50 hover:text-black active:border-fuchsia-500 active:bg-white 2xl:px-4 2xl:py-2",
      )}
      onClick={handlePlaybackDatePickerModal}
      title="Select Playback Date"
    >
      <FaRegCalendarAlt />
    </button>
  );
}
