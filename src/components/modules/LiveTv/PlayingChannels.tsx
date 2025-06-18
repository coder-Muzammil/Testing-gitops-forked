import { twMerge } from "tailwind-merge";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import PlayerContextComponent from "../LivePlayer/PlayerContextComponent";

function PlayingChannels() {
  const { selectedChannels } = useManageLiveTv();

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 content-start gap-4 transition-all duration-1000 ease-in-out",
        selectedChannels.length > 1 && "grid-cols-1 lg:grid-cols-2",
      )}
    >
      {selectedChannels.map((channel) => {
        const { id } = channel;

        return (
          <div
            key={id}
            className={twMerge(
              "mx-auto w-9/12 animate-slideUpFadeIn overflow-hidden rounded-md bg-black transition-all duration-300 2xl:w-10/12",
              selectedChannels.length > 1 && "w-full",
            )}
          >
            <PlayerContextComponent channel={channel} />
          </div>
        );
      })}
    </div>
  );
}
export default PlayingChannels;
