import Hls from "hls.js";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useStarPlayerContext } from "../../../hooks/useStarPlayerContext";
import { FaFastBackward, FaFastForward } from "react-icons/fa";

const StarVideoPlayer = ({
  src,
  isControlsOn = false,
}: {
  src?: string;
  isControlsOn?: boolean;
}) => {
  const { playerRef, hls, setHls, coverageTime, isMuted } =
    useStarPlayerContext();

  useEffect(() => {
    if (playerRef && src) {
      if (Hls.isSupported()) {
        const hlsInstance = new Hls({
          backBufferLength: 30,
        });
        setHls(hlsInstance);
      } else {
        if (playerRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
          playerRef.current.src = src;
        }
      }
    }
    return () => {
      if (hls) {
        hls.detachMedia();
        hls.destroy();
        setHls(null);
      }
    };
  }, [src, playerRef, setHls]);

  useEffect(() => {
    if (hls && playerRef && src) {
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        playerRef.current?.play().catch((error: unknown) => {
          console.error("Error playing video", error);
        });
      });
      hls.loadSource(src);
      hls.attachMedia(playerRef.current as HTMLMediaElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        playerRef.current?.play().catch((error: unknown) => {
          console.error("Error playing video", error);
        });
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        toast.error("Hls player error");
        console.log({ event, data });
      });
    }
    return () => {
      if (hls) {
        hls.detachMedia();
        hls.destroy();
        setHls(null);
      }
    };
  }, [hls, src, playerRef, setHls]);

  const handleForward = () => {
    const player = playerRef?.current;
    if (!player) return;

    if (
      !coverageTime.endTime ||
      player.currentTime + 5 <= coverageTime.endTime
    ) {
      player.currentTime += 5;
    } else {
      player.currentTime = coverageTime.endTime;
    }
  };

  const handleBackward = () => {
    const { startTime } = coverageTime;
    const player = playerRef?.current;
    if (player && player.currentTime - 5 >= startTime) {
      player.currentTime -= 5;
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 overflow-hidden rounded-bl-md rounded-br-md bg-gray-950 shadow">
      <video
        ref={playerRef}
        muted={isMuted}
        preload="auto"
        tabIndex={0}
        className="h-full w-full rounded-bl-md rounded-br-md object-contain"
        controls={isControlsOn}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") handleForward();
          if (e.key === "ArrowLeft") handleBackward();
        }}
      />
      <div className="flex w-full items-center justify-center">
        <div className="mb-1 flex w-full items-center justify-center gap-6 p-2">
          <button onClick={handleBackward} className="font-bold text-white">
            <FaFastBackward />
          </button>
          <button onClick={handleForward} className="font-bold text-white">
            <FaFastForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarVideoPlayer;
