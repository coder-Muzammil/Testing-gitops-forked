import { useRef, useState } from "react";
import { StarPlayerCoverageTime } from "./starPlayerContext.types";
import Hls from "hls.js";
import { StarPlayerContext } from "../../../hooks/useStarPlayerContext";

const StarPlayerContextComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [hls, setHls] = useState<Hls | null>(null);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [coverageTime, setCoverageTime] = useState<StarPlayerCoverageTime>({
    startTime: 0,
    endTime: 0,
  });
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <StarPlayerContext.Provider
      value={{
        playerRef,
        hls,
        setHls,
        currentSegmentIndex,
        setCurrentSegmentIndex,
        coverageTime,
        setCoverageTime,
        progress,
        setProgress,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        isMuted,
        setIsMuted,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </StarPlayerContext.Provider>
  );
};

export default StarPlayerContextComponent;
