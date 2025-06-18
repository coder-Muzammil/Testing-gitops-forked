import Datepicker from "react-tailwindcss-datepicker";
import { useLivePlayerContext } from "../../../hooks/useLivePlayerContext";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";
import { useClickAway } from "@uidotdev/usehooks";
import { MutableRefObject, useState } from "react";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import Hls from "hls.js";

function DatePicker() {
  const { channel, setIsPlaybackDatePickerModalActive, hls, playerRef } =
    useLivePlayerContext();
  const { selectedChannels, setToPlayback } = useManageLiveTv();
  const ref = useClickAway(() => {
    setIsPlaybackDatePickerModalActive(false);
  });

  const thisChannel = selectedChannels.find((ch) => ch.id === channel.id);
  const playbackDate = thisChannel?.playbackDate ?? "";
  const [newPlaybackDate, setNewPlaybackDate] = useState(playbackDate);

  const playbackDates = thisChannel?.playbackDates;
  // const startDate = playbackDates?.startDate ?? Date.now();
  const endDate = playbackDates?.endDate ?? Date.now();
  const excludedDates = playbackDates?.excludedDates ?? [];

  const { playbackLink } = channel;

  const formatedEndDate = new Date(endDate);
  formatedEndDate.setDate(formatedEndDate.getDate() - 1);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 px-3">
      <div
        className="w-[450px] rounded-lg bg-white px-6 py-4 dark:bg-slate-800"
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        <label htmlFor="" className="text-xs">
          Date Range
          {/* fix this with proper typing */}
          <Datepicker
            value={{ startDate: newPlaybackDate, endDate: newPlaybackDate }}
            asSingle={true}
            useRange={false}
            onChange={(value) => {
              if (typeof value?.startDate === "string") {
                const date = value.startDate;
                setNewPlaybackDate(date);
              }
            }}
            showShortcuts={false}
            placeholder="Select Date"
            inputClassName="outline-none w-full mt-1 first-letter:uppercase px-3 py-2 bg-white rounded-lg cursor-pointer grow shadow-[0px_2px_10px_rgba(0,0,0,0.2)] hover:shadow-[0px_2px_25px_rgba(0,0,0,0.2)] dark:bg-slate-800 dark:ring-1 dark:ring-slate-500 relative"
            toggleClassName="top-0 absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            popoverDirection="down"
            maxDate={new Date()}
            disabledDates={excludedDates.map((date) => {
              const formattedExcludedStartDate = new Date(date);
              formattedExcludedStartDate.setDate(
                formattedExcludedStartDate.getDate() - 1,
              );
              return {
                startDate: formattedExcludedStartDate,
                endDate: new Date(date),
              };
            })}
          />
        </label>
        <div className="h-3" />
        <div className="flex justify-center">
          <ButtonGradientPrimary
            type="button"
            onClick={() => {
              if (newPlaybackDate && playbackLink) {
                const video = playerRef?.current;
                hls?.loadSource(`${playbackLink}${newPlaybackDate}/live.m3u8`);
                console.log(`${playbackLink}${newPlaybackDate}/live.m3u8`);
                hls?.attachMedia(video as HTMLMediaElement);
                hls?.on(Hls.Events.MANIFEST_PARSED, () => {
                  video?.play().catch((error: unknown) => {
                    console.error("Error playing video", error);
                  });
                });
                setToPlayback(channel.id, newPlaybackDate);
              }

              setIsPlaybackDatePickerModalActive(false);
            }}
          >
            <span className="px-3">Get Stream</span>
          </ButtonGradientPrimary>
        </div>
      </div>
    </div>
  );
}
export default DatePicker;
