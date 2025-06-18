import { GetTranscribedVideoDataApiResponseType } from "../../../api/useGetTranscribedVideoData.types";
import UpdateDictionaryButton from "./UpdateDictionaryButton";
import DownloadButtons from "./DownloadButtons";
import { ImCross } from "react-icons/im";
import ApplyDictionaryButton from "./ApplyDictionaryButton";
import ViewDictionaryButton from "./ViewDictionaryButton";
import NewGptPromptsButtons from "../LiveStt/newsGptAndPlayTime/NewGptPromptsButtons";
import { useEffect, useState } from "react";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../api/useSendNewsGptCommands";
import useSttUploadContext from "./useSttUploadContext";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import NewsGptEditableDataModal from "../LiveStt/newsGptAndPlayTime/NewsGptEditableDataModal";

const TranscriptionControlButtonsBar = ({
  goBack,
  data,
}: {
  goBack: () => void;
  data: GetTranscribedVideoDataApiResponseType;
}) => {
  const { data: gptData, mutate, isPending } = useSendNewsGptCommands();
  const { selectedSttUploadsHeadlines } = useSttUploadContext();
  const { secondsTo12HourTimeString } = useDateTimeUtils();
  const [isOpenPromptsDropdown, setIsOpenPromptsDropdown] = useState(false);
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);
  const [clickedPrompt, setClickedPrompt] = useState("");
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);

  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);

  const handleSubmitPromptData = (prompt: string) => {
    const selectedData = selectedSttUploadsHeadlines.map((item) => {
      return {
        text: item.originalText,
        time: secondsTo12HourTimeString(item.startTime),
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

  const filteredData = data.chunks.map((chunk) => {
    return {
      srName: chunk.speakerName,
      updatedText: chunk.editedText,
    };
  });

  return (
    <>
      <div className="flex  flex-col items-center justify-between gap-2 rounded-lg">
        <div className="flex w-full items-center justify-end">
          <button
            className="flex w-[30px] items-center justify-center gap-2 rounded-lg  py-2 text-black dark:text-white"
            onClick={goBack}
          >
            <ImCross />
          </button>
        </div>
        {/* TODO: Fix it */}
        <div className="flex  w-full items-center justify-between gap-2 ">
          <DownloadButtons data={data} />

          {/* <div className="flex items-center gap-2">
            <TranslateButton data={data} />
          </div> */}
        </div>
        <div className="flex w-full  items-center  justify-between gap-2 ">
          <UpdateDictionaryButton
            filteredData={filteredData}
            videoId={data.video.id}
            source="sttUpload"
          />
          <ApplyDictionaryButton videoId={data.video.id} source="sttUpload" />
          <NewGptPromptsButtons
            onPromptClick={handleSubmitPromptData}
            isPending={isPending}
            isOpenDropdown={isOpenPromptsDropdown}
            setIsOpenDropdown={setIsOpenPromptsDropdown}
            selectedDataLength={selectedSttUploadsHeadlines.length}
            setClickedPrompt={setClickedPrompt}
          />
          <ViewDictionaryButton source="sttUpload" />
        </div>
      </div>
      {isOpenNewsGptDataModal && (
        <NewsGptEditableDataModal
          setIsOpenEditableModal={setIsOpenNewsGptDataModal}
          mkData={mkData.length > 0 ? mkData : [{ isUrdu: false, result: "" }]}
          setMkData={setMkData}
          setClickedPrompt={setClickedPrompt}
          clickedPrompt={clickedPrompt}
        />
      )}
    </>
  );
};

export default TranscriptionControlButtonsBar;
