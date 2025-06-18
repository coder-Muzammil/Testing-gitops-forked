import { MdOutlineVolumeOff, MdOutlineVolumeUp } from "react-icons/md";
import { useStarPlayerContext } from "../../../../hooks/useStarPlayerContext";

const MuteUnMute = () => {
  const { playerRef, isMuted, setIsMuted } = useStarPlayerContext();
  const handleIsMuted = () => {
    if (playerRef?.current) {
      if (isMuted) {
        playerRef.current.muted = false;
        setIsMuted(false);
      } else {
        playerRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };
  return (
    <button onClick={handleIsMuted} className="cursor-pointer text-2xl">
      {isMuted ? (
        <MdOutlineVolumeOff title="UnMute" />
      ) : (
        <MdOutlineVolumeUp title="Mute" />
      )}
    </button>
  );
};

export default MuteUnMute;
