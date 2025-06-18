import { create } from "zustand";
import { LiveTvState } from "./useManageLiveTv.types";
import { mountStoreDevtool } from "simple-zustand-devtools";

export const useManageLiveTv = create<LiveTvState>()((set, get) => ({
  selectedChannels: [],
  selectChannelIds: [],

  // updateSelectChannelIds(id) {
  //   set((state) => ({
  //     selectChannelIds: state.selectChannelIds.includes(id)
  //       ? state.selectChannelIds.filter((c) => c !== id)
  //       : [...state.selectChannelIds, id],
  //   }));
  // },
  updateSelectChannelIds(id) {
    set(() => ({
      selectChannelIds: [id],
    }));
  },

  unSelectChannelIds() {
    set(() => ({
      selectChannelIds: [],
    }));
  },

  updateHourPlay(data) {
    const { channelId, hourPlay } = data;

    set((state) => ({
      selectedChannels: state.selectedChannels.map((ch) =>
        ch.id === channelId
          ? {
              ...ch,
              liveLink: ch.liveLink.replace(
                /\/([^/]+)\.m3u8$/,
                `/${hourPlay}.m3u8`,
              ),
            }
          : ch,
      ),
    }));
  },

  addChannel(channel) {
    const ifThisChannelIsAlreadyPlaying = get().selectedChannels.some(
      (c) => c.id === channel.id,
    );

    if (ifThisChannelIsAlreadyPlaying) {
      return;
    }

    set((state) => ({
      selectedChannels: [
        ...state.selectedChannels,
        {
          ...channel,
          nowPlaying: "live",
          isClipExtractionActive: false,
          clippingData: {
            left: 0,
            right: 0,
          },
          playbackDate: null,
        },
      ],
    }));
  },
  removeChannel(channelId) {
    set((state) => ({
      selectedChannels: state.selectedChannels.filter(
        (ch) => ch.id !== channelId,
      ),
    }));
  },
  overWriteChannels(channels) {
    set({
      selectedChannels: channels.map((channel) => ({
        ...channel,
        nowPlaying: "live",
        isClipExtractionActive: false,
        clippingData: {
          left: 0,
          right: 0,
        },
        playbackDate: null,
      })),
    });
  },
  clearChannels() {
    set({ selectedChannels: [] });
  },
  unMuted: false,
  setUnMuted(channelId) {
    set({ unMuted: channelId });
  },
  muteAll() {
    set({ unMuted: false });
  },
  setToPlayback(channelId, playbackDate) {
    set((state) => ({
      selectedChannels: state.selectedChannels.map((ch) =>
        ch.id === channelId
          ? { ...ch, nowPlaying: "playback", playbackDate }
          : ch,
      ),
    }));
  },
  setToLive(channelId) {
    set((state) => ({
      selectedChannels: state.selectedChannels.map((ch) =>
        ch.id === channelId
          ? { ...ch, nowPlaying: "live", playbackDate: null }
          : ch,
      ),
    }));
  },
  setClipExtractionActive(channelId, isActive) {
    if (!isActive) {
      set((state) => ({
        selectedChannels: state.selectedChannels.map((ch) =>
          ch.id === channelId
            ? { ...ch, clippingData: { left: 0, right: 0 } }
            : ch,
        ),
      }));
    }

    set((state) => ({
      selectedChannels: state.selectedChannels.map((ch) =>
        ch.id === channelId ? { ...ch, isClipExtractionActive: isActive } : ch,
      ),
    }));
  },
  setLeft(channelId, value) {
    set((state) => ({
      selectedChannels: state.selectedChannels.map((ch) =>
        ch.id === channelId
          ? { ...ch, clippingData: { ...ch.clippingData, left: value } }
          : ch,
      ),
    }));
  },
  setRight(channelId, value) {
    set((state) => ({
      selectedChannels: state.selectedChannels.map((ch) =>
        ch.id === channelId
          ? { ...ch, clippingData: { ...ch.clippingData, right: value } }
          : ch,
      ),
    }));
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("manageLiveTv", useManageLiveTv);
}
