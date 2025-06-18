import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { useLivePlayerContext } from "../../../hooks/useLivePlayerContext";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import { useState } from "react";

function VolumeIcon() {
  const {
    channel: { id },
    playerRef,
  } = useLivePlayerContext();
  const { unMuted, setUnMuted } = useManageLiveTv();
  const [currentVolume, setCurrentVolume] = useState(1);

  const isMuted = unMuted === id;

  function handleMuteUnmute() {
    if (isMuted) {
      setUnMuted(false);
    } else {
      setUnMuted(id);
    }
  }

  return (
    <div className="absolute right-3 top-2 ">
      <div className="group/vol flex items-center gap-2 rounded-full px-3 py-0.5 hover:bg-gray-500/50">
        <p className="hidden cursor-pointer text-xs text-gray-300 transition-all group-hover/vol:block">
          {Math.round(currentVolume * 100)}%
        </p>
        <input
          type="range"
          min={0}
          max={100}
          className="hidden h-1 w-16 cursor-pointer transition-all group-hover/vol:block"
          value={currentVolume * 100}
          onChange={(e) => {
            const newVolume = Number(e.target.value);
            const player = playerRef?.current;

            if (player) {
              player.volume = newVolume / 100;
              setCurrentVolume(newVolume / 100);
            }
          }}
        />
        <button
          type="button"
          onClick={handleMuteUnmute}
          className=" h-7 w-7 rounded-full bg-black px-1.5 text-white"
        >
          {isMuted && <FaVolumeHigh />}
          {!isMuted && <FaVolumeXmark />}
        </button>
      </div>
    </div>
  );
}
export default VolumeIcon;
