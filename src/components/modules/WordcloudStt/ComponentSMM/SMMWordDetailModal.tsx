import React, { useEffect, useState } from "react";
import Portal from "../../../primitives/Portal";
import useGetSMMCloudSingleWord from "../../../../api/getSMMCloudSignleWord";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import useDownloadkwCloudReport from "../../../../api/useDownloadkwCloudReport";
import toast from "react-hot-toast";
import NewGptPromptsButtons from "../../LiveStt/newsGptAndPlayTime/NewGptPromptsButtons";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../../api/useSendNewsGptCommands";
import NewsGptEditableDataModal from "../../LiveStt/newsGptAndPlayTime/NewsGptEditableDataModal";
import { MdOutlineCancel } from "react-icons/md";
import CircularLoader from "../../../uiComponents/CircularLoader";

const SMMWordDetailModal = ({
  word,
  setOpenWordModal,
}: {
  word: string;
  setOpenWordModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, isLoading, isError, error } = useGetSMMCloudSingleWord({
    word,
  });
  const {
    mutate: downloadReport,
    isPending,
    isError: isDownloadReportError,
    error: downloadReportError,
  } = useDownloadkwCloudReport();

  const {
    data: gptData,
    mutate: sendData,
    isPending: isPendingGpt,
  } = useSendNewsGptCommands();

  const { formatDate, formatTime } = useDateTimeUtils();

  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [clickedPrompt, setClickedPrompt] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);

  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);

  const handleDownloadReport = () => {
    downloadReport(
      {
        word,
      },
      {
        onSuccess: () => {
          toast.success("Report downloaded successfully");
        },
        onError: (error) => {
          if (isDownloadReportError) {
            toast.error(downloadReportError.message);
          } else {
            toast.error("Error downloading report");
          }
          console.log(error);
        },
      },
    );
  };
  const handleSubmitPromptData = (prompt: string) => {
    const requiredData = data?.results.map((item) => {
      return {
        text: item.ocrResult,
        date: item.dateTime,
        time: formatTime(item.createdAt),
        channel_name: item.channelName,
      };
    });

    sendData(
      { prompt, data: requiredData ?? [] },
      {
        onSuccess: () => {
          setIsOpenNewsGptDataModal(true);
          setIsOpenDropdown(false);
        },
      },
    );
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div
          // ref={ref as React.MutableRefObject<HTMLDivElement>}
          className="w-11/12 rounded-lg bg-white  px-3 py-4 dark:bg-slate-400 sm:w-9/12 lg:w-1/2"
        >
          {isLoading && (
            <div className="flex items-start justify-center">
              <div className="size-14">
                <CircularLoader />
              </div>
            </div>
          )}

          {data && (
            <>
              <div className="flex items-center justify-between gap-5">
                {data.results.length == 0 ? (
                  <p className="pb-3 text-center font-semibold text-[#333970] dark:text-white">
                    No data found for {`word: "${word}"`}
                  </p>
                ) : (
                  <>
                    <p className="flex-1 text-start text-[18px] font-bold text-[#1f3a58] dark:text-white">
                      {`Selected Trending Word: "${word}" is Repeated "${String(data.results.length)}"
              Times.`}
                    </p>

                    {/* NewGpt Button */}
                    <NewGptPromptsButtons
                      onPromptClick={handleSubmitPromptData}
                      isPending={isPendingGpt}
                      isOpenDropdown={isOpenDropdown}
                      setIsOpenDropdown={setIsOpenDropdown}
                      setClickedPrompt={setClickedPrompt}
                    />

                    <button
                      onClick={() => {
                        handleDownloadReport();
                      }}
                      disabled={isPending}
                      className="w-48 rounded-md bg-gray-100 py-1 text-center font-semibold text-[#1f3a58] hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
                    >
                      {isPending ? "Downloading..." : "Download Report"}
                    </button>
                  </>
                )}

                <MdOutlineCancel
                  onClick={() => {
                    setOpenWordModal("");
                  }}
                  size={26}
                  cursor="pointer"
                  className="dark:text-white"
                />
              </div>

              {isError && (
                <p className="py-3 text-center text-red-500">{error.message}</p>
              )}

              <div className="mt-6 max-h-[45vh] overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="flex flex-row gap-4 bg-gray-200 py-2 text-sm font-semibold dark:bg-gray-300">
                      <th className="w-40 text-center">Channel Logo</th>
                      <th className="w-40 text-start">Channel Name</th>
                      <th className="flex-1 text-center">Ticker</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.results.map((item) => {
                      return (
                        <tr
                          key={item.id}
                          className="my-2 flex flex-row gap-4 border-b py-1 text-sm dark:bg-gray-600 dark:text-white/80"
                        >
                          <td className="flex w-40 items-center justify-center">
                            <img
                              // src={`${wordCloudImagesUrl}/channel_logo_analytics/${item.channelImage}/`}
                              src={item.channelImage}
                              className="object-fit h-14 w-14 rounded-full dark:bg-gray-400"
                              alt="Channel logo"
                            />
                          </td>
                          <td className="w-40 ps-2 pt-4">{item.channelName}</td>
                          <td className="flex flex-1 flex-col items-center justify-start gap-2 pr-2 text-right">
                            <img
                              src={item.tickerImage}
                              alt="Ticker not found"
                              className="object-fit h-10 w-full rounded-lg"
                            />
                            <span className="w-full px-4 text-right text-xs text-gray-600">{`${formatDate(item.createdAt)}, ${formatTime(item.createdAt)}`}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/******************************* Modal to News GPT Data ************************************/}
      {isOpenNewsGptDataModal && (
        <NewsGptEditableDataModal
          setIsOpenEditableModal={setIsOpenNewsGptDataModal}
          mkData={mkData.length > 0 ? mkData : [{ isUrdu: false, result: "" }]}
          setMkData={setMkData}
          clickedPrompt={clickedPrompt}
          setClickedPrompt={setClickedPrompt}
        />
      )}
    </Portal>
  );
};

export default SMMWordDetailModal;
