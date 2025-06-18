import dashjs from "dashjs";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useSttLiveContext } from "./useSttLiveContext";
import { sttLiveStreamServiceUrl } from "../../../api/apiConstants";

function BasicDashVideoPlayer() {
  const [searchParams] = useSearchParams();
  const { playerRef } = useSttLiveContext();

  const channelId = searchParams.get("selectedChannelId");
  const manifestUrl = `${sttLiveStreamServiceUrl}channel_${String(channelId)}/live.mpd`;

  useEffect(() => {
    if (playerRef.current && channelId) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(playerRef.current, manifestUrl, true);

      player.updateSettings({
        streaming: {
          buffer: {
            // Set the amount of buffer to keep, in seconds, when pruning the buffer.
            bufferToKeep: 30,
            // Set the buffer pruning interval in seconds.
            bufferPruningInterval: 10,
            // Set the stable buffer time in seconds. The player will attempt to maintain this buffer length if possible.
            stableBufferTime: 15,
          },
        },
      });

      // Handle errors
      player.on(
        dashjs.MediaPlayer.events.PLAYBACK_ERROR,
        (e: dashjs.PlaybackErrorEvent) => {
          console.error("DASH.js error:", e.error);
          toast.error(`Livestream url invalid.`);
        },
      );

      return () => {
        player.reset();
      };
    }
  }, [manifestUrl, channelId, playerRef]);

  return (
    <div className="w-full h-fit">
      <video
        id="dashvideoplayer"
        ref={playerRef}
        className="w-full h-full bg-gray-600 rounded-md"
        autoPlay
        muted={true}
        controls
        preload="auto"
      />
    </div>
  );
}
export default BasicDashVideoPlayer;
