import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useTickersContext from "./useTickersContext";
import CreateTickerModal from "../createCollage/CreateTickerModal";
import TimeSelectionField from "../LiveStt/TimeSelectionField";
import ChannelTypeSelectionDropDown from "../../primitives/ChannelTypeSelectionDropDown";
import SearchbarSearchParams from "../MyClips/SearchbarSearchParams";
import ClearFiltersAndLiveButton from "../../uiComponents/ClearFiltersAndLiveButton";
import DatepickerSearchParams from "../../uiComponents/DatepickerSearchParams";
import MultipleChannelsSelectionDropDown from "./MultipleChannelsSelectionDropDown";
import NewGptPromptsButtons from "../LiveStt/newsGptAndPlayTime/NewGptPromptsButtons";
import { getTickersUrl } from "../../../api/apiConstants";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../api/useSendNewsGptCommands";
import NewsGptEditableDataModal from "../LiveStt/newsGptAndPlayTime/NewsGptEditableDataModal";
import ReloadButton from "../HeadersButton/ReloadButton";
import CollageButton from "../HeadersButton/CollageButton";
const TickersHeader = () => {
  const [searchParams] = useSearchParams();
  const { selectedTickers } = useTickersContext();
  const { formatTime, formatDate } = useDateTimeUtils();

  const { data: gptData, mutate, isPending } = useSendNewsGptCommands();

  const [isCreateTickerModalOpen, setIsCreateTickerModalOpen] = useState(false);
  const [isOpenPromptsDropdown, setIsOpenPromptsDropdown] = useState(false);
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [clickedPrompt, setClickedPrompt] = useState("");

  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;

  const anySelectedTicker = selectedTickers.length > 0;

  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);

  const handleSubmitPromptData = (prompt: string) => {
    const selectedData = selectedTickers.map((item) => {
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
      <div className=" w-full ">
        <div className="grid w-full grid-cols-3 gap-3">
          {!isLive && (
            <>
              <DatepickerSearchParams />
              <TimeSelectionField slug="startTime" />
              <TimeSelectionField slug="endTime" />
            </>
          )}
          <SearchbarSearchParams />
          {/* Hiding channel type for now as it's not being used */}
          <ChannelTypeSelectionDropDown />
          <MultipleChannelsSelectionDropDown
            channelFilter={(channel) => channel.isTickerActivated}
          />
        </div>

        <div className="mt-3 flex w-full items-center justify-between gap-3 ">
          <div>
            {/* <button
              onClick={() => {
                setIsOpenPlayTimeModal(true);
              }}
              className="rounded-md bg-lavender-600 px-3 py-1 text-sm font-semibold text-white"
            >
              PlayTime
            </button> */}
          </div>
          <div className="flex items-center gap-3">
            <CollageButton
              anySelectedTicker={anySelectedTicker}
              length={selectedTickers.length}
              setIsCreateTickerModalOpen={setIsCreateTickerModalOpen}
            />
            <NewGptPromptsButtons
              onPromptClick={handleSubmitPromptData}
              isPending={isPending}
              isOpenDropdown={isOpenPromptsDropdown}
              setIsOpenDropdown={setIsOpenPromptsDropdown}
              selectedDataLength={selectedTickers.length}
              setClickedPrompt={setClickedPrompt}
            />
            {!isLive && <ReloadButton queryKey="getAllTickers" />}
            <ClearFiltersAndLiveButton url={getTickersUrl} />
          </div>
        </div>
      </div>
      {isCreateTickerModalOpen && (
        <CreateTickerModal
          setIsCreateTickerModalOpen={setIsCreateTickerModalOpen}
        />
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
      {/* {isOpenPlayTimeModal && (
        <>
          <TickersNewsGptAndPlayTimeModal
            setIsOpenModal={setIsOpenPlayTimeModal}
          />
        </>
      )} */}
    </>
  );
};

export default TickersHeader;
