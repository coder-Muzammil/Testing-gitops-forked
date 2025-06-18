import Hls from "hls.js";

export type StarPlayerCoverageTime = { startTime: number; endTime: number };
export type StarPlayerContextType = {
  playerRef: React.MutableRefObject<HTMLVideoElement | null> | null;
  // isPlaying: boolean;
  // setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  hls: Hls | null;
  setHls: React.Dispatch<React.SetStateAction<Hls | null>>;
  currentSegmentIndex: number;
  setCurrentSegmentIndex: React.Dispatch<React.SetStateAction<number>>;
  coverageTime: StarPlayerCoverageTime;
  setCoverageTime: React.Dispatch<React.SetStateAction<StarPlayerCoverageTime>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  // channel: SelectedChannelType;
  // isPlaybackDatePickerModalActive: boolean;
  // setIsPlaybackDatePickerModalActive: React.Dispatch<
  //   React.SetStateAction<boolean>
  // >;
  // currentTime: number;
  // setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  // isSaveModalOpen: boolean;
  // setIsSaveModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // clipUrl: string;
  // setClipUrl: React.Dispatch<React.SetStateAction<string>>;
  // clipPoster: string;
  // setClipPoster: React.Dispatch<React.SetStateAction<string>>;
};
