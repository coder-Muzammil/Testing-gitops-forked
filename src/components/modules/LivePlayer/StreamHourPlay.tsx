import { useClickAway } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { BiSolidVideos } from "react-icons/bi";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import { twMerge } from "tailwind-merge";

const StreamHourPlay = ({ channelId }: { channelId: number }) => {
  const [openHourOption, setOpenHourOption] = useState(false);
  const [playingHour, setPlayingHour] = useState("live");
  return (
    <div className="relative">
      <button
        type="button"
        className="flex w-full justify-center rounded-sm border border-white py-0.5 text-sm text-white transition-all hover:bg-white/50 hover:text-black active:border-fuchsia-500 active:bg-white 2xl:px-4 2xl:py-2"
        onClick={() => {
          setOpenHourOption(!openHourOption);
        }}
        title="Hour Play"
      >
        <BiSolidVideos />
      </button>

      {openHourOption && (
        <HourPlayOption
          channelId={channelId}
          playingHour={playingHour}
          setPlayingHour={setPlayingHour}
          setIsOpen={setOpenHourOption}
        />
      )}
    </div>
  );
};

export default StreamHourPlay;

// ------------------------------ Hour Play Option Component ------------------------------
function HourPlayOption({
  channelId,
  playingHour,
  setPlayingHour,
  setIsOpen,
}: {
  channelId: number;
  playingHour: string;
  setPlayingHour: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { updateHourPlay } = useManageLiveTv();

  const optionRef = useClickAway(() => {
    setIsOpen(false);
  });

  return (
    <div
      ref={optionRef as React.LegacyRef<HTMLDivElement>}
      className="absolute right-0 top-[calc(100%+0.3rem)] z-20 flex w-20 flex-col gap-1 rounded-sm bg-gray-600/90 p-1"
    >
      {["live", "1 hour", "2 hour", "4 hour", "8 hour"].map((item) => (
        <span
          onClick={() => {
            const removeSpace = item.replace(" ", "");
            updateHourPlay({ channelId, hourPlay: removeSpace });
            setPlayingHour(item);
            setIsOpen(false);
          }}
          key={item}
          className={twMerge(
            "cursor-pointer rounded-sm bg-gray-400/30 text-center text-xs capitalize text-gray-200 hover:bg-gray-400/40",
            playingHour === item && "border border-fuchsia-800 bg-gray-400/80",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
