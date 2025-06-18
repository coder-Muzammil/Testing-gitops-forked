import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { playlistUrl } from "./apiConstants";
import {
  GetPlaylistsResponseSchema,
  GetPlaylistsResponseType,
} from "./useGetPlaylists.types";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";

function useGetPlaylists() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response =
        await axiosPrivate.get<GetPlaylistsResponseType>(playlistUrl);

      return getSafeParsedDataAndLogIfError(
        GetPlaylistsResponseSchema.safeParse(response.data),
      );
    },
  });
}

export default useGetPlaylists;
