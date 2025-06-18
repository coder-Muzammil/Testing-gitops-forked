import { useLivePlayerContext } from "../../../../hooks/useLivePlayerContext";
import { useManageLiveTv } from "../../../../stores/useManageLiveTv";
import { TogglePlaybackButton } from "../TogglePlaybackButton";

function ClippingActionsControls() {
  const { playerRef, channel, setIsSaveModalOpen } = useLivePlayerContext();
  const { setClipExtractionActive, selectedChannels } = useManageLiveTv();

  const thisChannel = selectedChannels.find((ch) => ch.id === channel.id);

  const currentState = thisChannel?.isClipExtractionActive;

  function handleCancelClipping() {
    if (playerRef?.current) {
      const videoDuration = playerRef.current.duration;
      // -8 to avoid the video ending because last chunk is in buffering
      playerRef.current.currentTime = videoDuration - 8;
      playerRef.current.play().catch(() => {
        console.error("Error playing video");
      });
    }
    const newState = !currentState;
    setClipExtractionActive(channel.id, newState);
  }

  return (
    <div className="absolute bottom-[calc(2.5rem+3.5rem+5rem)] left-3 ">
      <div className="grid grid-cols-1 gap-2 rounded-md border border-white/20 bg-black px-1 py-1">
        <div className="grid items-center justify-center rounded-sm border border-white px-1 py-1 text-xs text-white hover:bg-gray-400 active:bg-gray-500">
          <TogglePlaybackButton />
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
        <button
          type="button"
          className="rounded-sm border border-lavender-500 bg-lavender-900/70 px-1 py-1 text-xs text-white hover:bg-lavender-900 active:bg-lavender-700/30"
          onClick={() => {
            playerRef?.current?.pause();
            setIsSaveModalOpen(true);
          }}
        >
          Save
        </button>
        <button
          type="button"
          className="rounded-sm border border-white px-1 py-1 text-xs text-white hover:bg-gray-400 active:bg-gray-500"
          onClick={handleCancelClipping}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default ClippingActionsControls;
