import { useMutation } from "@tanstack/react-query";
import {
  addMultipleChannelsToMultiplePlaylists,
  axiosPrivate,
} from "./apiConstants";

const useUpdatePlaylist = () => {
  return useMutation({
    mutationKey: ["updatePlaylist"],
    mutationFn: async ({
      playlistId,
      channelsIds,
    }: {
      playlistId: number;
      channelsIds: Array<number>;
    }) => {
      return axiosPrivate.patch(addMultipleChannelsToMultiplePlaylists, {
        playlistId,
        channelsIds,
      });
    },
  });
};

export default useUpdatePlaylist;
