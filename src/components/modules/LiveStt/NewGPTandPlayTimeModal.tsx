import { MdOutlineCancel } from "react-icons/md";
import Portal from "../../primitives/Portal";
import { useSearchParams } from "react-router-dom";
import NewsGptAndPlayTimeContent from "../PlayTime/NewsGptAndPlayTimeContent";
import SortHeadlinesData from "../PlayTime/SortHeadlinesData";
import { useEffect, useState } from "react";
import AddPlaytimeForm from "../PlayTime/AddPlaytimeForm";
import OpenPlaytimeFormButton from "../PlayTime/OpenPlaytimeFormButton";
import NewGptPromptsButtons from "./newsGptAndPlayTime/NewGptPromptsButtons";
import NewsGptEditableDataModal from "./newsGptAndPlayTime/NewsGptEditableDataModal";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../api/useSendNewsGptCommands";
import { useSttLiveContext } from "./useSttLiveContext";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import SingleDateInput from "../PlayTime/SingleDateInput";
import useGetHeadlinesNewsData from "../../../api/useGetHeadlinesNewsData";
import TickersMultipleHeadlinesSelectionDropdown from "../PlayTime/MultipleHeadlineSelectioDropDown";
import { isTimeInInterval, parseTime } from "../../../utils/helpers";
import { DownloadVideoFileOfNewsGptReportType } from "../../../api/useDownloadNewsGptReportVideo";

const NewGPTandPlayTimeModal = ({
  setIsOpenModal,
}: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [, setSearchParams] = useSearchParams();
  const {
    selectedHeadlines,
    setSelectedHeadlines,
    setIsPlayTimeStarPlayModalOpen,
  } = useSttLiveContext();
  const [isOpenPlaytimeForm, setIsOpenPlaytimeForm] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<
    Array<Array<string>>
  >([]);

  const [selectedTimeList, setSelectedTimeList] = useState<string>("");
  const [headlineTitle, setHeadlineTitle] = useState<Array<string>>([]);

  const {
    data: headlinesTimeInterval,
    isLoading: isHeadlinesLoading,
    isError: isHeadlinesError,
    error: headlinesError,
  } = useGetHeadlinesNewsData({
    selectedChannels,
    selectedTimeList,
    headlineTitle,
  });

  const { formatDate, secondsTo12HourTimeString } = useDateTimeUtils();
  const { data: gptData, mutate, isPending } = useSendNewsGptCommands();
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [clickedPrompt, setClickedPrompt] = useState("");

  const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null);
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [downloadedReportData, setDownloadReportData] =
    useState<DownloadVideoFileOfNewsGptReportType>({
      startTime: "",
      endTime: "",
      channelName: "",
    });

  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);

  /**
   * INFO: Filtering headlines time intervals based on selected headlines for download the NewsGPT report with vodeo.
   */
  useEffect(() => {
    if (typeof selectedHeadline === "string") {
      const findData = headlinesTimeInterval?.find(
        (item) => item.title === selectedHeadline,
      );
      if (findData) {
        if (findData.data.length > 1) {
          setDownloadReportData({
            startTime: findData.data[0].createdAt,
            endTime: findData.data[findData.data.length - 1].createdAt,
            channelName: findData.selectedChannels[0],
          });
        } else {
          setSelectedHeadline(null);
        }
      }
    }
  }, [selectedHeadline, headlinesTimeInterval]);

  const handleCloseModal = () => {
    setIsPlayTimeStarPlayModalOpen(false);
    setIsOpenModal(false);
    setSelectedHeadlines([]);
    setSearchParams((currentParams) => {
      currentParams.delete("timeList");
      currentParams.delete("sort");
      currentParams.delete("playTimeChannels");
      currentParams.delete("date");
      currentParams.delete("titles");
      return currentParams;
    });
  };

  const handleSubmitPromptData = (prompt: string) => {
    // getting Playtime Data
    const selectedData = selectedHeadlines.map((item) => {
      return {
        text: item.transcription,
        time: secondsTo12HourTimeString(item.startTime),
        date: formatDate(item.createdAt),
        channel_name: item.channelName,
      };
    });

    // getting playtime time intervals
    const headlinesTimes = headlinesTimeInterval?.map((item) => {
      return {
        time: item.time,
        title: item.title,
      };
    });

    // filtering headlines time intervals based on selected headlines
    const filteredHeadlinesTimes = headlinesTimes?.filter((headlineTime) => {
      return selectedData.some((headlineData) => {
        const headlineTimeObj = parseTime(headlineData.time);
        return isTimeInInterval(headlineTimeObj, headlineTime.time);
      });
    });

    mutate(
      {
        prompt,
        data: selectedData,
        times: filteredHeadlinesTimes,
      },
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
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
        <div className="w grid h-[90vh] w-[90vw] grid-rows-[auto_1fr] gap-2 rounded-md bg-white p-1 dark:bg-gray-700">
          <header className="grid grid-cols-1 grid-rows-2 gap-2 bg-gray-100 py-2.5 dark:bg-gray-900 lg:grid-cols-[3fr_2fr] lg:grid-rows-1">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 ">
              {/* <OpenNewGptCommandPromptModalButton
                setIsOpenCommandPromptModal={setIsOpenNewsGptCommandPromptModal}
              /> */}
              <SingleDateInput />
              <TickersMultipleHeadlinesSelectionDropdown
                setSelectedChannels={setSelectedChannels}
                setSelectedTimeList={setSelectedTimeList}
                setHeadlineTitle={setHeadlineTitle}
              />
            </div>
            <div className="flex items-center justify-end gap-1">
              <SortHeadlinesData />
              <OpenPlaytimeFormButton setIsOpen={setIsOpenPlaytimeForm} />
              <NewGptPromptsButtons
                onPromptClick={handleSubmitPromptData}
                isPending={isPending}
                isOpenDropdown={isOpenDropdown}
                setIsOpenDropdown={setIsOpenDropdown}
                selectedDataLength={selectedHeadlines.length}
                setClickedPrompt={setClickedPrompt}
              />
              <MdOutlineCancel
                onClick={handleCloseModal}
                size={26}
                cursor="pointer"
                className="dark:text-white/80"
              />
            </div>
          </header>

          {/* Headlines data table: showing data of all selected headlines  */}

          <NewsGptAndPlayTimeContent
            data={headlinesTimeInterval}
            isLoading={isHeadlinesLoading}
            isError={isHeadlinesError}
            error={headlinesError}
          />
        </div>
      </div>

      {/******************************* Modal to add time for Headlines ************************************/}
      {isOpenPlaytimeForm && (
        <AddPlaytimeForm setIsOpen={setIsOpenPlaytimeForm} />
      )}

      {/******************************* Modal to News GPT Data ************************************/}
      {isOpenNewsGptDataModal && (
        <NewsGptEditableDataModal
          setIsOpenEditableModal={setIsOpenNewsGptDataModal}
          mkData={mkData.length > 0 ? mkData : [{ isUrdu: false, result: "" }]}
          setMkData={setMkData}
          clickedPrompt={clickedPrompt}
          setClickedPrompt={setClickedPrompt}
          downloadReportWithVideoData={downloadedReportData}
          selectedChannels={selectedChannels}
          module="playtime"
        />
      )}

      {/* {isOpenNewsGptCommandPromptModal && (
        <NewGptPromptModal
          setIsOpenPromptModal={setIsOpenNewsGptCommandPromptModal}
        />
      )} */}
    </Portal>
  );
};

export default NewGPTandPlayTimeModal;
