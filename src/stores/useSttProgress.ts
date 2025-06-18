import { create } from "zustand";

type State = {
  progress: number;
  timeToDownload: number;
};

type Actions = {
  setProgress: (value: number) => void;
  resetProgress: () => void;
  updateTimeToDownload: (value: number) => void;
};

const useProgressStore = create<State & Actions>((set) => ({
  progress: 0,
  timeToDownload: 0,
  setProgress: (value) => {
    set({ progress: value });
  },
  resetProgress: () => {
    set({ progress: 0 });
  },

  updateTimeToDownload: (value: number) => {
    set({ timeToDownload: value });
  }
}));

export default useProgressStore;
