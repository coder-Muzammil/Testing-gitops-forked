import Hls from "hls.js";
import { SelectedChannelType } from "../../../stores/useManageLiveTv.types";

export type playerContextType = {
  playerRef: React.MutableRefObject<HTMLVideoElement | null> | null;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  hls: Hls | null;
  setHls: React.Dispatch<React.SetStateAction<Hls | null>>;
  channel: SelectedChannelType;
  isPlaybackDatePickerModalActive: boolean;
  setIsPlaybackDatePickerModalActive: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  isSaveModalOpen: boolean;
  setIsSaveModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clipUrl: string;
  setClipUrl: React.Dispatch<React.SetStateAction<string>>;
  clipPoster: string;
  setClipPoster: React.Dispatch<React.SetStateAction<string>>;
};
