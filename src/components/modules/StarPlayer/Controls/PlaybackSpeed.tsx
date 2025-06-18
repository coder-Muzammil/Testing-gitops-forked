import { useClickAway } from "@uidotdev/usehooks";
import { MutableRefObject, useState } from "react";
import { VscPlayCircle } from "react-icons/vsc";
import { useStarPlayerContext } from "../../../../hooks/useStarPlayerContext";

const PlaybackSpeed = () => {
  const { playerRef } = useStarPlayerContext();
  const [isPlaybackOpen, setIsPlayBackOpen] = useState(false);

  const playbackRef = useClickAway(() => {
    setIsPlayBackOpen(false);
  });
  const playbackSpeedHandler = (speed: number) => {
    if (playerRef?.current) {
      playerRef.current.playbackRate = speed;
      setIsPlayBackOpen(false);
    }
  };
  return (
    <button
      ref={playbackRef as MutableRefObject<HTMLButtonElement>}
      className="relative rounded-full p-1"
    >
      <VscPlayCircle
        className="cursor-pointer text-xl"
        onClick={() => {setIsPlayBackOpen(!isPlaybackOpen)}}
        title="Playback Speed"
      />

      {isPlaybackOpen && (
        <div className="absolute right-1 top-[calc(-100%-96px)] flex flex-col gap-3 rounded-md bg-gray-950/80 py-2 shadow shadow-gray-400">
          <span
            onClick={() => {playbackSpeedHandler(1)}}
            className="w-full cursor-pointer rounded-sm px-2 py-1 text-center text-sm text-white hover:bg-gray-700/70"
          >
            normal
          </span>
          <span
            onClick={() => {playbackSpeedHandler(1.5)}}
            className="w-full cursor-pointer rounded-sm px-2 py-1 text-center text-sm text-white hover:bg-gray-700/70"
          >
            1.5
          </span>
          <span
            onClick={() => {playbackSpeedHandler(2)}}
            className="w-full cursor-pointer rounded-sm px-2 py-1 text-center text-sm text-white hover:bg-gray-700/70"
          >
            2
          </span>
        </div>
      )}
    </button>
  );
};

export default PlaybackSpeed;
