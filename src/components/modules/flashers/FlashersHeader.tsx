import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFlasherContext from "./useFlasherContext";
import CreateFlasherModal from "./CreateFlasherModal";
import TimeSelectionField from "../LiveStt/TimeSelectionField";
import ChannelTypeSelectionDropDown from "../../primitives/ChannelTypeSelectionDropDown";
import SearchbarSearchParams from "../MyClips/SearchbarSearchParams";
import DatepickerSearchParams from "../../uiComponents/DatepickerSearchParams";
import MultipleChannelsSelectionDropDown from "../Tickers/MultipleChannelsSelectionDropDown";
import ClearFiltersAndLiveButton from "../../uiComponents/ClearFiltersAndLiveButton";
import NewGptPromptsButtons from "../LiveStt/newsGptAndPlayTime/NewGptPromptsButtons";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import { getAllFlashersUrl } from "../../../api/apiConstants";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../api/useSendNewsGptCommands";
import NewsGptEditableDataModal from "../LiveStt/newsGptAndPlayTime/NewsGptEditableDataModal";
import ReloadButton from "../HeadersButton/ReloadButton";
import ShowFullFrameButtons from "../HeadersButton/ShowFullFrameButtons";
import FlashersCollageButton from "../HeadersButton/FlashersCollageButton";

const FlashersHeader = () => {
  const [searchParams] = useSearchParams();
  const { formatTime, formatDate } = useDateTimeUtils();
  const { selectedFlashers } = useFlasherContext();
  const [isCreateFlasherModalOpen, setIsCreateFlasherModalOpen] =
    useState(false);
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [isOpenPromptsDropdown, setIsOpenPromptsDropdown] = useState(false);
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);
  const [clickedPrompt, setClickedPrompt] = useState("");

  const { data: gptData, mutate, isPending } = useSendNewsGptCommands();

  // isLive is either null of false. If it's null, it means it's true
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);

  const handleSubmitPromptData = (prompt: string) => {
    const selectedData = selectedFlashers.map((item) => {
      return {
        text: item.ocrResult,
        time: formatTime(item.dateTime),
        date: formatDate(item.dateTime),
        channel_name: item.channel.channelName,
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
          <MultipleChannelsSelectionDropDown
            channelFilter={(channel) => channel.isTickerActivated}
          />
        </div>

        <div className="flex items-center justify-between">
          <ShowFullFrameButtons />
          <div className="mt-3 flex w-full flex-1 items-center justify-end gap-3 ">
            <FlashersCollageButton />
            <NewGptPromptsButtons
              onPromptClick={handleSubmitPromptData}
              isPending={isPending}
              isOpenDropdown={isOpenPromptsDropdown}
              setIsOpenDropdown={setIsOpenPromptsDropdown}
              selectedDataLength={selectedFlashers.length}
              setClickedPrompt={setClickedPrompt}
            />
            {!isLive && <ReloadButton queryKey="getAllFlashers" />}
            <ClearFiltersAndLiveButton url={getAllFlashersUrl} />
          </div>
        </div>
        {isCreateFlasherModalOpen && (
          <CreateFlasherModal
            setIsCreateFlasherModalOpen={setIsCreateFlasherModalOpen}
          />
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
          />
        )}
      </div>
    </>
  );
};

export default FlashersHeader;
