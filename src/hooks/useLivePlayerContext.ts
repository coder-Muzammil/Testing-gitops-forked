import { createContext, useContext } from "react";
import { playerContextType } from "../components/modules/LivePlayer/PlayerContextComponent.types";

const contextInitialState = {
  playerRef: null,
  isPlaying: false,
  setIsPlaying: () => {
    console.log("setIsPlaying function not defined");
  },
  hls: null,
  setHls: () => {
    console.log("setHls function not defined");
  },
  isPlaybackDatePickerModalActive: false,
  setIsPlaybackDatePickerModalActive: () => {
    console.log("setPlaybackDatePickerActive function not defined");
  },
  currentTime: 0,
  setCurrentTime: () => {
    console.log("setCurrentTime function not defined");
  },
  isSaveModalOpen: false,
  setIsSaveModalOpen: () => {
    console.log("setIsSaveModalOpen function not defined");
  },
  channel: {
    id: 0,
    channel_type: "",
    isFlasherActivated: false,
    isFRActivated: false,
    isSTTActivated: false,
    isTickerActivated: false,
    isWordCloudActivated: false,
    stream_source: "",
    process_id: "",
    subprocess_id: "",
    name: "",
    liveLink: "",
    isLive: false,
    logo: "",
    nowPlaying: "live",
    playlists: [],
    playbackDates: {
      startDate: "",
      endDate: "",
      excludedDates: [],
    },
    playbackLink: "",
    poster: "",
    playbackDate: null,
    isClipExtractionActive: false,
    clippingData: {
      left: 0,
      right: 0,
    },
  },

  clipUrl: "",
  setClipUrl: () => {
    console.log("setClipUrl function not defined");
  },
  clipPoster: "",
  setClipPoster: () => {
    console.log("setClipPoster function not defined");
  },
} satisfies playerContextType;

export const PlayerContext =
  createContext<playerContextType>(contextInitialState);
export function useLivePlayerContext() {
  const context = useContext(PlayerContext);

  //   TODO: see if this is the correct condition. If not, update it.
  if (!context.playerRef) {
    throw new Error(
      "useLivePlayerContext must be used within a PlayerProvider",
    );
  }

  return context;
}
