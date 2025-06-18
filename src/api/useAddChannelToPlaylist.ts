import { useMutation } from "@tanstack/react-query";
import { playlistUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";

function useAddChannelToPlaylist() {
  const axiosInstance = useAxiosPrivate();

  return useMutation({
    mutationFn: async (playlistData: {
      playlistIds: Array<number>;
      channelId: number;
    }) => {
      return axiosInstance.patch(playlistUrl, playlistData);
    },
  });
}

export default useAddChannelToPlaylist;
