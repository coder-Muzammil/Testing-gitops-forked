import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DatepickerSearchParams from "../../uiComponents/DatepickerSearchParams";
import SearchbarSearchParams from "../MyClips/SearchbarSearchParams";
import SttTopModelingSwitch from "./SttTopModelingSwitch";
import TimeSelectionField from "./TimeSelectionField";
import DownloadSelectedDataButton from "./DownloadSelectedDataButton";
import ChannelTypeSelectionDropDown from "../../primitives/ChannelTypeSelectionDropDown";
import ClearFiltersAndLiveButton from "../../uiComponents/ClearFiltersAndLiveButton";
import { useEffect, useState } from "react";
import NewGPTandPlayTimeModal from "./NewGPTandPlayTimeModal";
import NewGptPromptsButtons from "./newsGptAndPlayTime/NewGptPromptsButtons";
import { liveTranscriptionsUrl } from "../../../api/apiConstants";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../api/useSendNewsGptCommands";
import { useSttLiveContext } from "./useSttLiveContext";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import NewsGptEditableDataModal from "./newsGptAndPlayTime/NewsGptEditableDataModal";
import ViewDictionaryButton from "../SttUploadNew/ViewDictionaryButton";
import ApplyDictionaryButton from "../SttUploadNew/ApplyDictionaryButton";
import SttMultipleChannelsSelectionDropDown from "../LiveStt/SttMultipleChannelsSelectionDropDown";
// import useGetLiveTranscriptions from "../../../api/useGetLiveTranscriptions";
// import UpdateDictionaryButton from "../SttUploadNew/UpdateDictionaryButton";
function TopFiltersBar() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isOpenPlayTimeModal, setIsOpenPlayTimeModal] = useState(false);

  const { pathname, search } = useLocation();
  const {
    selectedTranscriptions,
    transcriptionsIdsForApplyDictionary,
    // setIsStarPlayModalOpen,
  } = useSttLiveContext();
  const { secondsTo12HourTimeString, formatDate } = useDateTimeUtils();
  const [isOpenPromptsDropdown, setIsOpenPromptsDropdown] = useState(false);
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);

  const { data: gptData, mutate, isPending } = useSendNewsGptCommands();
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [clickedPrompt, setClickedPrompt] = useState("");

  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;
  // const { data } = useGetLiveTranscriptions();
  // const filteredData =
  //   data?.pages[0].results.map((item) => ({
  //     srName: item.speakerName,
  //     updatedText: item.transcription,
  //   })) ?? [];

  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);

  const handleSubmitPromptData = (prompt: string) => {
    const selectedData = selectedTranscriptions.map((item) => {
      return {
        text: item.transcription,
        time: secondsTo12HourTimeString(item.startTime),
        date: formatDate(item.createdAt),
        channel_name: item.channelName,
      };
    });

    mutate(
      {
        prompt,
        data: selectedData,
      },
      {
        onSuccess: () => {
          setIsOpenNewsGptDataModal(true);
          setIsOpenPromptsDropdown(false);
        },
      },
    );
  };

  return (
    <>
      <div className="w-full">
        <div className="grid w-full grid-cols-3 gap-3">
          {!isLive && (
            <>
              <DatepickerSearchParams />
              <TimeSelectionField slug="startTime" />
              <TimeSelectionField slug="endTime" />
            </>
          )}

          <SearchbarSearchParams />
          <ChannelTypeSelectionDropDown />
          {/* <MultipleChannelsSelectionDropDown
            channelFilter={(channel) => channel.isSTTActivated}
          /> */}
          <SttMultipleChannelsSelectionDropDown slug="Channels" />
        </div>

        <div className=" grid w-full grid-cols-[33%_33%_33%]">
          <div className="flex w-full flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3">
            <button
              // onClick={() => {
              //   setIsOpenPlayTimeModal(true);
              //   setIsStarPlayModalOpen(false);
              // }}
              onClick={() => {
                navigate("/playtime");
              }}
              className="w-full rounded-md bg-lavender-600 px-3 py-1 text-center text-sm font-semibold text-white sm:w-auto"
            >
              PlayTime
            </button>
            <ViewDictionaryButton source="stt" />
            <ApplyDictionaryButton
              sttLiveIds={transcriptionsIdsForApplyDictionary}
              source="stt"
            />
          </div>
          <SttTopModelingSwitch />
          <div className="relative flex flex-wrap items-center justify-end gap-4 sm:p-4">
            <DownloadSelectedDataButton />
            {pathname === "/stt/live" &&
              !search.includes("contentType=topicModeling") && (
                <NewGptPromptsButtons
                  onPromptClick={handleSubmitPromptData}
                  isPending={isPending}
                  isOpenDropdown={isOpenPromptsDropdown}
                  setIsOpenDropdown={setIsOpenPromptsDropdown}
                  selectedDataLength={selectedTranscriptions.length}
                  setClickedPrompt={setClickedPrompt}
                />
              )}
            <ClearFiltersAndLiveButton url={liveTranscriptionsUrl} />
          </div>
        </div>
      </div>

      {isOpenPlayTimeModal && (
        <>
          <NewGPTandPlayTimeModal setIsOpenModal={setIsOpenPlayTimeModal} />
        </>
      )}

      {isOpenNewsGptDataModal && (
        <NewsGptEditableDataModal
          setIsOpenEditableModal={setIsOpenNewsGptDataModal}
          mkData={mkData.length > 0 ? mkData : [{ isUrdu: false, result: "" }]}
          setMkData={setMkData}
          clickedPrompt={clickedPrompt}
          setClickedPrompt={setClickedPrompt}
        />
      )}
    </>
  );
}
export default TopFiltersBar;
