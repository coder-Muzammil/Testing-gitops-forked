import { SingleChannelType } from "../api/responseTypes/getAllChannelsApi.types";

export type PlaybackStateType =
  | {
      nowPlaying: "live";
      playbackDate: null;
    }
  | {
      nowPlaying: "playback";
      playbackDate: string;
    };

export type ChannelAdditionFieldsType = {
  isClipExtractionActive: boolean;
  clippingData: {
    left: number;
    right: number;
  };
} & PlaybackStateType;

export type SelectedChannelType = SingleChannelType & ChannelAdditionFieldsType;

type HourPlayType = {
  channelId: number;
  hourPlay: string;
};
export type LiveTvState = {
  updateHourPlay: (data: HourPlayType) => void;
  selectChannelIds: Array<number>;
  updateSelectChannelIds: (channelIds: number) => void;
  unSelectChannelIds: () => void;
  selectedChannels: Array<SelectedChannelType>;
  addChannel: (channel: SingleChannelType) => void;
  removeChannel: (channelId: number) => void;
  overWriteChannels: (channels: Array<SingleChannelType>) => void;
  clearChannels: () => void;
  unMuted: false | number;
  setUnMuted: (channelId: number | false) => void;
  muteAll: () => void;
  setToPlayback: (channelId: number, playbackDate: string) => void;
  setToLive: (channelId: number) => void;
  setClipExtractionActive: (channelId: number, isActive: boolean) => void;
  setLeft: (channelId: number, value: number) => void;
  setRight: (channelId: number, value: number) => void;
};
