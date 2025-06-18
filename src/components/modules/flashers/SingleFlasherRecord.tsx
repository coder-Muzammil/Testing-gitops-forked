import { FaEdit } from "react-icons/fa";
import { SingleFlasherType } from "../../../api/responseTypes/getFlashersApi.types";
import EditFlasherOcrModal from "./EditFlasherOcrModal";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFlashersContext from "./useFlasherContext";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import { MdOutlineStarRate } from "react-icons/md";
import { twMerge } from "tailwind-merge";
function SingleFlasherRecord({
  flasher,
  onScrollToFlasher,
  flashersPositionOnStarPlayOpen,
}: {
  flasher: SingleFlasherType;
  onScrollToFlasher: (recordId: number) => void;
  flashersPositionOnStarPlayOpen: (recordId: number) => void;
}) {
  const {
    channel: { channelLogo, channelId },
    flasherImageUrl,
    flasherFullFrameImageUrl,
    dateTime,
    ocrResult,
    recordId,
  } = flasher;

  const { formatDate, formatTime, getStartAndEndTime } = useDateTimeUtils();
  const [isViewAndEditModalOpen, setIsViewAndEditModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isfullframe,
    selectedFlashers,
    setSelectedFlashers,
    clickedFlasher,
    setClickedFlasher,
    setIsStarPlayModalOpen,
    setStarPlayData,
    isStarPlayModalOpen,
  } = useFlashersContext();

  const searchQuery = searchParams.get("query") ?? "";
  const isSearchQuery = searchQuery.length > 0;

  const handleSelectSingle = (flasher: SingleFlasherType) => {
    const isAlreadySelected = selectedFlashers.some(
      (selectedflasher) => selectedflasher.recordId === flasher.recordId,
    );
    if (isAlreadySelected) {
      setSelectedFlashers((prev) => {
        return prev.filter(
          (selectedFlasher) => selectedFlasher.recordId !== flasher.recordId,
        );
      });
    } else {
      setSelectedFlashers((prev) => {
        return [...prev, flasher];
      });
    }
  };

  const handleSearchScrollFlashers = () => {
    const time = formatTime(dateTime);
    const { startTime, endTime } = getStartAndEndTime(time);

    if (isSearchQuery) {
      setClickedFlasher(recordId);
      setSearchParams((currentParams) => {
        currentParams.set("isLive", "false");
        currentParams.set("startTime", startTime);
        currentParams.set("endTime", endTime);
        currentParams.set("channel", String(channelId));
        currentParams.delete("query");
        return currentParams;
      });
      setTimeout(() => {
        onScrollToFlasher(recordId);
      }, 1000);
    }
  };

  const isScrolledFlasher = clickedFlasher === recordId;

  return (
    <tr
      id={`flasher-row-${String(recordId)}`}
      className={twMerge("border-b", isScrolledFlasher && "bg-lavender-100")}
    >
      <td className="align-center w-16  text-center">
        <img
          src={channelLogo ?? ""}
          alt="channel-logo"
          className="inline w-full rounded-md"
        />
      </td>

      <td className={twMerge(" px-6 py-3", isStarPlayModalOpen && "w-1/2")}>
        <div className="mx-auto w-[450px] py-3">
          <img
            src={isfullframe ? flasherFullFrameImageUrl : flasherImageUrl}
            alt="flasher not found"
            className="w-full"
          />
        </div>
      </td>
      <td className="text-center">{formatDate(dateTime)}</td>
      <td
        className={twMerge(
          "text-center",
          isSearchQuery && "cursor-pointer font-semibold text-blue-400",
        )}
        onClick={handleSearchScrollFlashers}
      >
        {formatTime(dateTime)}
      </td>
      <td
        className="cursor-pointer text-center"
        onClick={() => {
          {
            setTimeout(() => {
              flashersPositionOnStarPlayOpen(recordId);
            }, 300);
            setIsStarPlayModalOpen(true);
            setStarPlayData({
              channelName: flasher.channel.channelName,
              time: dateTime,
              date: formatDate(dateTime),
            });
          }
        }}
      >
        <MdOutlineStarRate size={26} />
      </td>
      <td>
        <button
          className="text-xl"
          onClick={() => {
            setIsViewAndEditModalOpen(true);
            setSearchParams((currentParams) => {
              currentParams.set("isLive", "false");

              return currentParams;
            });
          }}
        >
          <FaEdit />
        </button>
      </td>
      <td className="text-center">
        {selectedFlashers.some(
          (selectedFlasher) => selectedFlasher.recordId === flasher.recordId,
        ) ? (
          <span className="rounded-full border border-lavender-400 p-2 text-center font-bold text-lavender-500">
            {selectedFlashers.findIndex(
              (selectedFlasher) =>
                selectedFlasher.recordId === flasher.recordId,
            ) + 1}
          </span>
        ) : null}
      </td>

      <td className="text-center">
        <input
          type="checkbox"
          className="mx-auto block aspect-square w-4 accent-lavender-500"
          checked={selectedFlashers.some(
            (selectedFlasher) => selectedFlasher.recordId === flasher.recordId,
          )}
          onChange={() => {
            handleSelectSingle(flasher);
          }}
        />
      </td>
      {isViewAndEditModalOpen && (
        <EditFlasherOcrModal
          flasherId={recordId}
          ocrResult={ocrResult}
          flasherImageUrl={flasherImageUrl}
          setIsViewAndEditModalOpen={setIsViewAndEditModalOpen}
        />
      )}
    </tr>
  );
}
export default SingleFlasherRecord;
