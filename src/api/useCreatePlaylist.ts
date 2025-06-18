import { useMutation } from "@tanstack/react-query";
import { playlistUrl } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";

function useCreatePlaylist() {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["createPlaylist"],
    mutationFn: ({
      playlistName,
      channelIds,
    }: {
      playlistName: string;
      channelIds: Array<number>;
    }) => {
      return axiosPrivate.post(playlistUrl, {
        playlistName: playlistName,
        channelIds,
      });
    },
  });
}

export default useCreatePlaylist;
