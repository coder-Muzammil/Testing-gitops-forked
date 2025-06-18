import { useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import useTickersContext from "../Tickers/useTickersContext";
import useTranslateTickersOcr from "../../../api/useTranslateTickersOcr";
import CircularLoader from "../../uiComponents/CircularLoader";

function SortableTickersCollageViewModal({
  setIsCreateTickerModalOpen,
}: {
  setIsCreateTickerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    selectedTickers,
    setSelectedTickers,
    tickersIdsForTranslation,
    setTickersIdsForTranslation,
  } = useTickersContext();

  const {
    mutate: translateTickersOcr,
    isPending,
    isError,
    data: translatedData,
  } = useTranslateTickersOcr();
  const { formatTime, formatDate } = useDateTimeUtils();

  const handleRemoveTicker = (id: number) => {
    const updatedTickers = selectedTickers.filter(
      (ticker) => ticker.recordId !== id,
    );
    setSelectedTickers(updatedTickers);
    setTickersIdsForTranslation((prev) => prev.filter((tid) => tid !== id));

    if (updatedTickers.length === 0) {
      setIsCreateTickerModalOpen(false);
    }
  };

  useEffect(() => {
    if (tickersIdsForTranslation.length !== 0) {
      translateTickersOcr({
        selectedRecords: tickersIdsForTranslation,
        source: "tickers",
      });
    }
  }, [tickersIdsForTranslation]);

  const handleCheckboxChange = (id: number) => {
    setTickersIdsForTranslation((prevIds) =>
      prevIds.length === 0 ? [id] : prevIds[0] === id ? [] : [id],
    );
  };

  const sortableList = selectedTickers.map((ticker) => ({
    id: ticker.recordId,
    ...ticker,
  }));

  return (
    <div className="grid h-screen grid-rows-[47%_40%] gap-2">
      <div className="overflow-auto">
        <ReactSortable list={sortableList} setList={setSelectedTickers}>
          {selectedTickers.map((ticker) => (
            <div
              className="grid grid-cols-[auto_1fr_auto] gap-3"
              key={ticker.recordId}
            >
              <div className="flex flex-col justify-between">
                <div className="h-[100px] w-[100px]">
                  <img
                    id="collage"
                    src={ticker.channel.channelLogo ?? ""}
                    className="h-full w-full"
                    alt="Channel Image"
                  />
                </div>
                <div className="flex w-full items-center justify-center">
                  <div>
                    <p className="text-center">{formatDate(ticker.dateTime)}</p>
                    <p className="text-center">{formatTime(ticker.dateTime)}</p>
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <img
                  src={ticker.tickerImageUrl}
                  className="h-full w-full"
                  alt="Ticker Image"
                />
                <button
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xl text-white"
                  onClick={() => {
                    handleRemoveTicker(ticker.recordId);
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={tickersIdsForTranslation.includes(ticker.recordId)}
                  onChange={() => {
                    handleCheckboxChange(ticker.recordId);
                  }}
                />
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>

      <div className="  flex flex-col items-start  rounded-md bg-gray-200 dark:bg-gray-700 ">
        <p className=" mx-2 my-1 text-lg font-bold dark:text-white">OCR</p>
        <div className=" hide-scrollbar flex w-full flex-col overflow-y-scroll">
          <div className="flex items-center justify-center">
            {isPending && tickersIdsForTranslation.length > 0 && (
              <div className="h-10 w-10">
                <CircularLoader />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            {isError && tickersIdsForTranslation.length > 0 && (
              <div className="h-10 w-10">
                <p className="text-red">Something went wrong</p>
              </div>
            )}
          </div>
          {tickersIdsForTranslation.length > 0 &&
            !isPending &&
            translatedData?.map((ticker) => (
              <div
                key={ticker.recordId}
                className=" mx-2 my-3 rounded-md bg-white px-2 py-4 dark:bg-gray-600 dark:text-white "
              >
                <p>{ticker.ocrResult}</p>
              </div>
            ))}
          {tickersIdsForTranslation.length == 0 &&
            selectedTickers.map((ticker) => {
              return (
                <div
                  key={ticker.recordId}
                  className=" mx-2 my-3 rounded-md bg-white px-2 py-4 dark:bg-gray-600 dark:text-white "
                >
                  <p>{ticker.ocrResult}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SortableTickersCollageViewModal;
