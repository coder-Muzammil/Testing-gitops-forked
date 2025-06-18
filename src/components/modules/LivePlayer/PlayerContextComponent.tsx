import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { SelectedChannelType } from "../../../stores/useManageLiveTv.types";
import VolumeIcon from "./VolumeIcon";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import VerticalControlsBar from "./VerticalControlsBar";
import ClippingControls from "./Clipping/ClippingControls";
import PlayerControls from "./PlayerControls";
import ClippingActionsControls from "./Clipping/ClippingActionsControls";
import SaveClipDataModal from "./Clipping/SaveClipDataModal";
import DatePicker from "./DatePicker";
import CircularLoader from "../../uiComponents/CircularLoader";
import CloseButton from "./CloseButton";
import { PlayerContext } from "../../../hooks/useLivePlayerContext";

function PlayerContextComponent({ channel }: { channel: SelectedChannelType }) {
  const { liveLink: src } = channel;
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hls, setHls] = useState<Hls | null>(null);
  const { unMuted, selectedChannels } = useManageLiveTv();
  const [isPlaybackDatePickerModalActive, setIsPlaybackDatePickerModalActive] =
    useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [clipUrl, setClipUrl] = useState("");
  const [clipPoster, setClipPoster] = useState("");
  const [isLoading] = useState(false);
  const thisChannel = selectedChannels.find((ch) => ch.id === channel.id);

  useEffect(() => {
    let hlsInstance: Hls | null = null;
    const playerElement = playerRef.current;

    if (Hls.isSupported()) {
      hlsInstance = new Hls({
        backBufferLength: 30,
      });
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(playerElement as HTMLMediaElement);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Manifest parsed");
        playerElement?.play().catch((error: unknown) => {
          console.error("Error playing video", error);
        });
      });

      // hlsInstance.on(Hls.Events.ERROR, (event, data) => {
      //   console.error("HLS error:", { event, data });
      // });

      setHls(hlsInstance);
    } else if (playerElement?.canPlayType("application/vnd.apple.mpegurl")) {
      playerElement.src = src;
    }

    return () => {
      playerElement?.pause(); // Use the playerElement variable in the cleanup function
      if (hlsInstance) {
        hlsInstance.detachMedia();
        hlsInstance.destroy();
      }
      setHls(null);
    };
  }, [src]);

  // useEffect(() => {
  //   if (Hls.isSupported()) {
  //     const hlsInstance = new Hls({
  //       backBufferLength: 30,
  //     });
  //     setHls(hlsInstance);
  //   } else if (
  //     playerRef.current?.canPlayType("application/vnd.apple.mpegurl")
  //   ) {
  //     playerRef.current.src = src;
  //   }

  //   return () => {
  //     if (hls) {
  //       hls.detachMedia();
  //       hls.destroy();
  //       setHls(null);
  //     }
  //   };
  // }, [src]);

  // useEffect(() => {
  //   if (hls) {
  //     hls.loadSource(src);
  //     hls.attachMedia(playerRef.current as HTMLMediaElement);
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       console.log("Manifest parsed");
  //       playerRef.current?.play().catch((error: unknown) => {
  //         console.error("Error playing video", error);
  //       });
  //     });

  //     // hls.on(Hls.Events.ERROR, (event, data) => {
  //     // console.error("HLS error:", { event, data });
  //     // });
  //   }

  //   return () => {
  //     if (hls) {
  //       hls.detachMedia();
  //       hls.destroy();
  //       setHls(null);
  //     }
  //   };
  // }, [hls, src]);

  useEffect(() => {
    const videoPlayer = playerRef.current;

    function setPlayingTrue() {
      setIsPlaying(true);
    }

    function setPlayingFalse() {
      setIsPlaying(false);
    }

    videoPlayer?.addEventListener("playing", setPlayingTrue);

    videoPlayer?.addEventListener("pause", setPlayingFalse);

    return () => {
      videoPlayer?.removeEventListener("playing", setPlayingTrue);
      videoPlayer?.removeEventListener("pause", setPlayingFalse);
    };
  }, [playerRef, setIsPlaying]);

  useEffect(() => {
    hls?.on(Hls.Events.FRAG_LOADING, () => {
      // setIsLoading(true);
    });

    hls?.on(Hls.Events.FRAG_LOADED, () => {
      // setIsLoading(false);
    });
  }, [hls]);

  function handleVideoClick() {
    const isPaused = playerRef.current?.paused;

    if (!isPaused) {
      playerRef.current?.pause();
      return;
    }

    playerRef.current.play().catch((error: unknown) => {
      console.error("Error playing video", error);
    });
  }

  function updateCurrentTime(action: "fwd" | "bwd") {
    if (action === "fwd" && playerRef.current) {
      playerRef.current.currentTime += 10;
    }
    if (action === "bwd" && playerRef.current) {
      playerRef.current.currentTime -= 10;
    }
  }

  const isMuted = unMuted === channel.id;
  const isClippingActive = thisChannel?.isClipExtractionActive;

  return (
    <PlayerContext.Provider
      value={{
        playerRef,
        isPlaying,
        setIsPlaying,
        hls,
        setHls,
        channel,
        isPlaybackDatePickerModalActive,
        setIsPlaybackDatePickerModalActive,
        currentTime,
        setCurrentTime,
        isSaveModalOpen,
        setIsSaveModalOpen,
        clipUrl,
        setClipUrl,
        clipPoster,
        setClipPoster,
      }}
    >
      <div className="group relative">
        <video
          className="aspect-video w-full object-contain"
          ref={playerRef}
          muted={!isMuted}
          onClick={handleVideoClick}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              updateCurrentTime("fwd");
            }
            if (e.key === "ArrowLeft") {
              updateCurrentTime("bwd");
            }
            if (e.key === " ") {
              handleVideoClick();
            }
          }}
          preload="auto"
          tabIndex={0}
        />
        <CloseButton channelId={channel.id} />

        {isLoading && (
          <div className="absolute left-1/2 top-1/2 aspect-square w-16 -translate-x-1/2 -translate-y-1/2 2xl:w-24 ">
            <CircularLoader />
          </div>
        )}

        <VolumeIcon />
        <VerticalControlsBar channelId={channel.id} />
        <div className="absolute bottom-2 left-0 right-0 flex">
          {isClippingActive && <ClippingControls />}
          {isClippingActive && <ClippingActionsControls />}
        </div>
        {!isClippingActive && <PlayerControls />}
        {isPlaybackDatePickerModalActive && (
          <ModalBackdrop>
            <DatePicker />
          </ModalBackdrop>
        )}
        {isSaveModalOpen && (
          <div className="fixed inset-0 z-10 bg-black/50">
            <SaveClipDataModal />
          </div>
        )}
      </div>
    </PlayerContext.Provider>
  );
}
export default PlayerContextComponent;

function ModalBackdrop({ children }: { children: React.ReactNode }) {
  return <div className="absolute inset-0 bg-black/50">{children}</div>;
}
