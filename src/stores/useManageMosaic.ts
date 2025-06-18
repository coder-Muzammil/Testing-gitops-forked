import { create } from "zustand";
import { MosaicStateType } from "./useManageMosaic.types";

const useManageMosaic = create<MosaicStateType>()((set) => ({
  mosaicSize: 3,
  selectedPlaylistName: "",
  selectedChannels: [],
  setMosaicSize(size) {
    set({ mosaicSize: size });
  },
  unMuted: false,
  setUnMuted(channelId) {
    set({ unMuted: channelId });
  },
  muteAll() {
    set({ unMuted: false });
  },

  setSelectedPlaylistName(name) {
    set({ selectedPlaylistName: name });
  },
  addChannel(channel) {
    set((state) => ({
      selectedChannels: [...state.selectedChannels, channel],
    }));
  },
  addChannelAtIndex(channel, index) {
    set((state) => {
      const updatedChannels = [...state.selectedChannels];
      updatedChannels[index] = channel;
      return { selectedChannels: updatedChannels };
    });
  },

  // removeChannel(channelId) {
  //   set((state) => ({
  //     selectedChannels: state.selectedChannels.filter(
  //       (ch) => ch && ch.id !== channelId,
  //     ),
  //   }));
  // },

  removeChannel(channelId) {
    set((state) => ({
      selectedChannels: state.selectedChannels.map((ch) =>
        ch && ch.id === channelId ? null : ch,
      ),
    }));
  },

  overWriteChannels(channels) {
    set({ selectedChannels: channels });
  },

  clearChannels() {
    set({ selectedChannels: [] });
  },
}));

export default useManageMosaic;
