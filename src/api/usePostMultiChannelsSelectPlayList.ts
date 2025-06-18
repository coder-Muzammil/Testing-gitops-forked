import { useMutation } from "@tanstack/react-query";
import {
  addMultipleChannelsToMultiplePlaylists,
  axiosPrivate,
} from "./apiConstants";

const usePostMultiChannelsSelectPlayList = () => {
  return useMutation({
    mutationKey: ["postMultiChannelsSelectPlayList"],
    mutationFn: async ({
      playListName,
      playListIds,
      channelsIds,
    }: {
      playListName: string;
      playListIds: Array<number>;
      channelsIds: Array<number>;
    }) => {
      return await axiosPrivate.post(addMultipleChannelsToMultiplePlaylists, {
        playListName,
        playListIds,
        channelsIds,
      });
    },
  });
};

export default usePostMultiChannelsSelectPlayList;
