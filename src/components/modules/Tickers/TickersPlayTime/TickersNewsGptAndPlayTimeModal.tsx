import { MdOutlineCancel } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Portal from "../../../primitives/Portal";
import SingleDateInput from "../../PlayTime/SingleDateInput";
import SortHeadlinesData from "../../PlayTime/SortHeadlinesData";
import OpenPlaytimeFormButton from "../../PlayTime/OpenPlaytimeFormButton";
import AddPlaytimeForm from "../../PlayTime/AddPlaytimeForm";
import TickersNewsGptAndPlayTimeContent from "./TickersNewsGptAndPlayTimeContent";
import useTickersContext from "../useTickersContext";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../../api/useSendNewsGptCommands";
import NewGptPromptsButtons from "../../LiveStt/newsGptAndPlayTime/NewGptPromptsButtons";
import NewsGptEditableDataModal from "../../LiveStt/newsGptAndPlayTime/NewsGptEditableDataModal";

const TickersNewsGptAndPlayTimeModal = ({
  setIsOpenModal,
}: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: gptData, mutate, isPending } = useSendNewsGptCommands();

  const [, setSearchParams] = useSearchParams();
  const { selectedTickersHeadlines } = useTickersContext();

  const [isOpenPlaytimeForm, setIsOpenPlaytimeForm] = useState(false);
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [clickedPrompt, setClickedPrompt] = useState("");

  const { formatDate, formatTime } = useDateTimeUtils();

  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSearchParams((currentParams) => {
      currentParams.delete("timeList");
      currentParams.delete("sort");
      currentParams.delete("playTimeChannels");
      currentParams.delete("date");
      return currentParams;
    });
  };

  const handleSubmitPromptData = (prompt: string) => {
    const data = selectedTickersHeadlines.map((item) => {
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
        data,
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
        <div className="grid h-[90vh] w-11/12 grid-rows-[auto_1fr] gap-2 rounded-md bg-white p-1">
          <header className="grid grid-cols-1 grid-rows-2 gap-2 bg-gray-100 py-2.5 lg:grid-cols-[3fr_2fr] lg:grid-rows-1">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 ps-2">
              {/* <OpenNewGptCommandPromptModalButton
                setIsOpenCommandPromptModal={setIsOpenNewsGptCommandPromptModal}
              /> */}
              <SingleDateInput />
              {/* <TickersMultipleHeadlinesSelectionDropdown /> */}
            </div>
            <div className="flex items-center justify-end gap-1">
              <SortHeadlinesData />
              <OpenPlaytimeFormButton setIsOpen={setIsOpenPlaytimeForm} />
              <NewGptPromptsButtons
                onPromptClick={handleSubmitPromptData}
                isPending={isPending}
                isOpenDropdown={isOpenDropdown}
                setIsOpenDropdown={setIsOpenDropdown}
                selectedDataLength={selectedTickersHeadlines.length}
                setClickedPrompt={setClickedPrompt}
              />
              <MdOutlineCancel
                onClick={handleCloseModal}
                size={26}
                cursor="pointer"
              />
            </div>
          </header>
          {/* Headlines data table: showing data of all selected headlines  */}
          <TickersNewsGptAndPlayTimeContent />
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
        />
      )}
    </Portal>
  );
};

export default TickersNewsGptAndPlayTimeModal;
