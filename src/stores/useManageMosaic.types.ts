import { SingleChannelType } from "../api/responseTypes/getAllChannelsApi.types";
// import { SelectedChannelType } from "./useManageLiveTv.types";

export type MosaicSizeType = 3 | 4 | 5 | 6 | 7 | 8;

export type MosaicStateType = {
  mosaicSize: MosaicSizeType;
  selectedPlaylistName: string;
  setMosaicSize: (size: MosaicSizeType) => void;
  unMuted: false | number;
  setUnMuted: (channelId: number) => void;
  muteAll: () => void;

  selectedChannels: Array<SingleChannelType | null>; // converted to Array<SelectedChannelType>
  setSelectedPlaylistName: (name: string) => void;
  addChannel: (channel: SingleChannelType) => void;
  addChannelAtIndex: (channel: SingleChannelType, index: number) => void;
  removeChannel: (channelId: number) => void;
  overWriteChannels: (channels: Array<SingleChannelType>) => void;
  clearChannels: () => void;
};
// & LiveTvState;
