import { FaEdit } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import { SingleTickerType } from "../../../api/responseTypes/getAllTickersApi.types";
import useTickersContext from "./useTickersContext";
import EditTickerOcrModal from "./EditTickerOcrModal";
import { MdOutlineStarRate } from "react-icons/md";
import { twMerge } from "tailwind-merge";
function SingleTickerRecord({ ticker }: { ticker: SingleTickerType }) {
  const {
    channel: { channelLogo, channelId, channelName },
    tickerImageUrl,
    dateTime,
    ocrResult,
    recordId,
  } = ticker;
  const {
    formatDate,
    extractTimeFromDateString,
    formatTime,
    getStartAndEndTime,
  } = useDateTimeUtils();

  const [isViewAndEditModalOpen, setIsViewAndEditModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    selectedTickers,
    setSelectedTickers,
    setIsStarPlayModalOpen,
    isStarPlayModalOpen,
    setStarPlayData,
  } = useTickersContext();

  const [isCenter, setIsCenter] = useState(false);

  const rowRef = useRef<HTMLTableRowElement>(null);
  const searchQuery = searchParams.get("query") ?? "";
  const isSearchQuery = searchQuery.length > 0;

  const isThisHighlightedTicker =
    searchParams.get("highlight") === String(recordId);

  useEffect(() => {
    const rowElement = rowRef.current;

    if ((isCenter || isThisHighlightedTicker) && rowElement) {
      rowElement.scrollIntoView({
        behavior: "smooth",
        block: isCenter ? "center" : "start",
      });
    }
  }, [isCenter, isThisHighlightedTicker]);

  const handleSelectSingle = (ticker: SingleTickerType) => {
    const isAlreadySelected = selectedTickers.some(
      (selectedTickers) => selectedTickers.recordId === ticker.recordId,
    );
    if (isAlreadySelected) {
      setSelectedTickers((prev) => {
        return prev.filter(
          (selectedTickers) => selectedTickers.recordId !== ticker.recordId,
        );
      });
    } else {
      setSelectedTickers((prev) => {
        return [...prev, ticker];
      });
    }
  };

  const handleSearchScrolledTicker = () => {
    const datePart = dateTime.split("T")[0];
    const time = formatTime(dateTime);
    const { startTime, endTime } = getStartAndEndTime(time);

    if (isSearchQuery) {
      setSearchParams((currentParams) => {
        currentParams.set("isLive", "false");
        currentParams.set("startTime", startTime);
        currentParams.set("channel", String(channelId));
        currentParams.set("endTime", endTime);
        currentParams.set("startDate", String(datePart));
        currentParams.set("endDate", String(datePart));
        currentParams.set("highlight", String(ticker.recordId));
        currentParams.delete("query");
        return currentParams;
      });
    }
  };

  return (
    <tr
      id={`ticker-row-${String(ticker.recordId)}`}
      className={twMerge(
        "border-b",
        isThisHighlightedTicker && "bg-lavender-100",
      )}
      ref={rowRef}
    >
      <td className="align-center w-16 text-center">
        <img
          src={channelLogo ?? ""}
          alt="channel-logo"
          className="inline w-full rounded-md py-1"
        />
      </td>

      <td className={twMerge(" px-6 py-3", isStarPlayModalOpen && "w-1/2")}>
        <div>
          <img
            src={tickerImageUrl}
            alt="ticker not found"
            className="w-full "
          />
        </div>
      </td>
      <td className="text-center">{formatDate(dateTime)}</td>
      <td
        className={twMerge(
          "text-center",
          isSearchQuery && "cursor-pointer font-semibold text-blue-400",
        )}
        onClick={handleSearchScrolledTicker}
      >
        {formatTime(dateTime)}
      </td>
      <td
        className="cursor-pointer text-center"
        onClick={() => {
          setIsStarPlayModalOpen(true);
          setStarPlayData({
            channelName: channelName,
            time: extractTimeFromDateString(dateTime),
            date: formatDate(dateTime),
          });
          setIsCenter(true);
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
        {selectedTickers.some(
          (selectedTickers) => selectedTickers.recordId === ticker.recordId,
        ) ? (
          <span className="rounded-full border border-lavender-400 p-2 text-center font-bold text-lavender-500">
            {selectedTickers.findIndex(
              (selectedTickers) => selectedTickers.recordId === ticker.recordId,
            ) + 1}
          </span>
        ) : null}
      </td>
      <td className="text-center">
        <input
          type="checkbox"
          className="mx-auto block aspect-square w-4 accent-lavender-500"
          checked={selectedTickers.some(
            (selectedFlasher) => selectedFlasher.recordId === ticker.recordId,
          )}
          onChange={() => {
            handleSelectSingle(ticker);
          }}
        />
      </td>
      {isViewAndEditModalOpen && (
        <EditTickerOcrModal
          tickerId={recordId}
          ocrResult={ocrResult}
          tickerImageUrl={tickerImageUrl}
          setIsViewAndEditModalOpen={setIsViewAndEditModalOpen}
        />
      )}
    </tr>
  );
}
export default SingleTickerRecord;
