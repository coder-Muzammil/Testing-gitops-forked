import { useEffect, useState } from "react";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../api/useSendNewsGptCommands";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import { useSttLiveContext } from "../LiveStt/useSttLiveContext";
import { isTimeInInterval, parseTime } from "../../../utils/helpers";
import SingleDateInput from "./SingleDateInput";
import TickersMultipleHeadlinesSelectionDropdown from "./MultipleHeadlineSelectioDropDown";
import SortHeadlinesData from "./SortHeadlinesData";
import OpenPlaytimeFormButton from "./OpenPlaytimeFormButton";
import NewGptPromptsButtons from "../LiveStt/newsGptAndPlayTime/NewGptPromptsButtons";
import AddPlaytimeForm from "./AddPlaytimeForm";
import { useNavigate } from "react-router-dom";
import NewsGptEditableDataModal from "../LiveStt/newsGptAndPlayTime/NewsGptEditableDataModal";
import { DownloadVideoFileOfNewsGptReportType } from "../../../api/useDownloadNewsGptReportVideo";
import { SingleHeadlineNewsDataType } from "../../../api/useGetHeadlinesNewsData";
import { FaArrowLeftLong } from "react-icons/fa6";
const PlayTimeHeader = ({
  headlinesTimeInterval,
  setSelectedChannels,
  setSelectedTimeList,
  setHeadlineTitle,
  selectedChannels,
}: {
  headlinesTimeInterval: Array<SingleHeadlineNewsDataType> | undefined;
  setSelectedChannels: React.Dispatch<
    React.SetStateAction<Array<Array<string>>>
  >;
  setSelectedTimeList: React.Dispatch<React.SetStateAction<string>>;
  setHeadlineTitle: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedChannels: Array<Array<string>>;
}) => {
  const navigate = useNavigate();
  const { selectedHeadlines } = useSttLiveContext();
  const { formatDate, secondsTo12HourTimeString } = useDateTimeUtils();
  const { data: gptData, mutate, isPending } = useSendNewsGptCommands();
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);
  const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null);
  const [isOpenPlaytimeForm, setIsOpenPlaytimeForm] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [clickedPrompt, setClickedPrompt] = useState("");
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [downloadedReportData, setDownloadReportData] =
    useState<DownloadVideoFileOfNewsGptReportType>({
      startTime: "",
      endTime: "",
      channelName: "",
    });
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
  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);
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

  // temporary function if any  bug report related to clearing sttate

  //   const handleCloseModal = () => {
  //     setIsPlayTimeStarPlayModalOpen(false);
  //     setIsOpenModal(false);
  //     setSelectedHeadlines([]);
  //     setSearchParams((currentParams) => {
  //       currentParams.delete("timeList");
  //       currentParams.delete("sort");
  //       currentParams.delete("playTimeChannels");
  //       currentParams.delete("date");
  //       currentParams.delete("titles");
  //       return currentParams;
  //     });
  //   };
  return (
    <>
      <div className="w grid  grid-rows-[auto_1fr] gap-2 rounded-md bg-white p-1 dark:bg-gray-700">
        <div className="flex  items-center justify-start">
          <button
            onClick={() => {
              navigate("/stt/live");
            }}
          >
            <FaArrowLeftLong size={24} />
          </button>
        </div>
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
          </div>
        </header>
        {isOpenPlaytimeForm && (
          <AddPlaytimeForm setIsOpen={setIsOpenPlaytimeForm} />
        )}
        {isOpenNewsGptDataModal && (
          <NewsGptEditableDataModal
            setIsOpenEditableModal={setIsOpenNewsGptDataModal}
            mkData={
              mkData.length > 0 ? mkData : [{ isUrdu: false, result: "" }]
            }
            setMkData={setMkData}
            clickedPrompt={clickedPrompt}
            setClickedPrompt={setClickedPrompt}
            downloadReportWithVideoData={downloadedReportData}
            selectedChannels={selectedChannels}
            module="playtime"
          />
        )}
      </div>
    </>
  );
};

export default PlayTimeHeader;
