import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate, playlistUrl } from "./apiConstants";

const useDeletePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePlaylist"],
    mutationFn: (id: number) => {
      return axiosPrivate.delete(playlistUrl, { params: { id } });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["playlists"],
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
  });
};

export default useDeletePlaylist;
