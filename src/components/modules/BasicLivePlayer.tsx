import Hls from "hls.js";
import { useEffect, useRef } from "react";
function BasicLivePlayer({ src, id }: { src: string; id: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const hls = new Hls({
        backBufferLength: 30,
      });
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current?.play().catch((error: unknown) => {
          console.error("Error while playing:", error);
        });
      });
      hls.on(Hls.Events.ERROR, function (event, data) {
        console.log("hls error", { event, data, id });
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("fatal network error encountered, try to recover");
              // hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("fatal media error encountered, try to recover");
              // hls.recoverMediaError();
              break;
            default:
              console.error({ data, event, error: "hls error" });
              break;
          }
        }
      });
    }
  }, [videoRef, src, id]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-fill"
      // TODO: temporary id for testing, must be removed
      id={`live-player-${String(id)}`}
      muted
      autoPlay
      controls
    />
  );
}
export default BasicLivePlayer;
