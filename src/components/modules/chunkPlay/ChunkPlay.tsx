import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import toast from "react-hot-toast";

// Global reference to track the currently playing audio
let globalAudioRef: HTMLAudioElement | null = null;
let globalSetPlaying: React.Dispatch<React.SetStateAction<boolean>> | null =
  null;
let globalSetProgress: React.Dispatch<React.SetStateAction<number>> | null =
  null;

const ChunkPlay = ({
  mediaChunk,
  isStarPlayModalOpen,
}: {
  mediaChunk: string | undefined;
  isStarPlayModalOpen: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleAudioEnd = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);
  useEffect(() => {
    if (isStarPlayModalOpen && globalAudioRef) {
      globalAudioRef.pause();
      globalAudioRef.currentTime = 0;
      if (globalSetPlaying) globalSetPlaying(false);
      if (globalSetProgress) globalSetProgress(0);
    }
  }, [isStarPlayModalOpen]);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // If another audio is playing, stop it and reset its progress
    if (globalAudioRef && globalAudioRef !== audio) {
      globalAudioRef.pause();
      globalAudioRef.currentTime = 0;
      if (globalSetPlaying) globalSetPlaying(false);
      if (globalSetProgress) globalSetProgress(0);
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .then(() => {
          globalAudioRef = audio;
          globalSetPlaying = setIsPlaying;
          globalSetProgress = setProgress;
        })
        .catch((err: unknown) => {
          toast.error("No Audio Available");
          console.error("Audio play error:", err);
          setIsPlaying(false);
        });
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="relative inline-block h-10 w-10">
        {/* SVG Circular Progress Bar */}
        <svg
          className="absolute left-0 top-0"
          width="36"
          height="36"
          viewBox="0 0 40 40"
        >
          {/* Background Circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="transparent"
            stroke={progress > 0 ? "" : "#e5e7eb"} // Fill whole bar with lavender when playing
            strokeWidth="4"
          />

          {/* Progress Circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="transparent"
            stroke="#7A59A0"
            strokeWidth="4"
            strokeDasharray="113"
            strokeDashoffset={113 - (progress / 100) * 113}
            strokeLinecap="round"
            transform="rotate(-90 20 20)"
          />
        </svg>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={isStarPlayModalOpen} // Disable button when modal is open
          className={`absolute inset-0 left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full ${
            isStarPlayModalOpen
              ? "cursor-not-allowed bg-gray-400"
              : "bg-lavender-500/80 dark:bg-lavender-500/40"
          } text-white shadow-md`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      <audio ref={audioRef} src={mediaChunk ?? ""}>
        <source type="audio/wav" />
      </audio>
    </>
  );
};

export default ChunkPlay;
