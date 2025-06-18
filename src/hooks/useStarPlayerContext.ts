import { createContext, useContext } from "react";
import { StarPlayerContextType } from "../components/modules/StarPlayer/starPlayerContext.types";

const contextInitialState = {
  playerRef: null,
  hls: null,
  setHls: () => {
    console.log("setHls function not defined");
  },
  currentSegmentIndex: 0,
  setCurrentSegmentIndex: () => {
    console.log("setCurrentSegmentIndex function not defined");
  },
  coverageTime: {
    startTime: 0,
    endTime: 0,
  },
  setCoverageTime: () => {
    console.log("setCoverageTime function not defined");
  },
  progress: 0,
  setProgress: () => {
    console.log("setProgress function not defined");
  },
  duration: 0,
  setDuration: () => {
    console.log("setDuration function not defined");
  },
  currentTime: 0,
  setCurrentTime: () => {
    console.log("setCurrentTime function not defined");
  },
  isMuted: false,
  setIsMuted: () => {
    console.log("setIsMuted function not defined");
  },
  isPlaying: false,
  setIsPlaying: () => {
    console.log("setIsPlaying function not defined");
  },
};

export const StarPlayerContext =
  createContext<StarPlayerContextType>(contextInitialState);

export const useStarPlayerContext = () => {
  return useContext(StarPlayerContext);
};
