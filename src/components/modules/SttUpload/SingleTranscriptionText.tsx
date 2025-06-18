import { twMerge } from "tailwind-merge";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import UpdateTextModal from "./UpdateTextModal";
import { TranscriptionType } from "../../../api/useGetTranscribedVideoData.types";
import { checkLanguage } from "../../../utils/helpers";
import useSttUploadContext from "../SttUploadNew/useSttUploadContext";

const SingleTranscriptionText = ({ chunk }: { chunk: TranscriptionType }) => {
  const { id, editedText, speakerName, startTime } = chunk;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const language = checkLanguage(editedText);

  const {
    selectedChunksForTranslation,
    setSelectedChunksForTranslation,
    setSelectedSttUploadsHeadlines,
    isTranscribing,
  } = useSttUploadContext();
  const handleCheckboxChange = () => {
    setSelectedChunksForTranslation((prevSelectedChunks: Array<number>) => {
      if (prevSelectedChunks.includes(id)) {
        return prevSelectedChunks.filter((chunkId) => chunkId !== id);
      } else {
        return [...prevSelectedChunks, id];
      }
    });
    setSelectedSttUploadsHeadlines((prevChunks: Array<TranscriptionType>) => {
      if (prevChunks.some((chunk) => chunk.id === id)) {
        return prevChunks.filter((chunk) => chunk.id !== id);
      } else {
        return [...prevChunks, chunk];
      }
    });
  };

  const handlePlayer = async () => {
    const player = document.getElementById("video-player") as HTMLAudioElement;

    player.currentTime = startTime;
    try {
      await player.play();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" grid w-full cursor-pointer grid-cols-[auto_auto_1fr] items-center gap-4 rounded-lg bg-white p-2 dark:bg-gray-800 ">
      <div className="cursor-pointer">
        <FiEdit
          size={20}
          onClick={() => {
            setIsEditModalOpen(!isEditModalOpen);
          }}
        />
      </div>
      <div className="h-fit">
        <input
          type="checkbox"
          className="block aspect-square w-4"
          checked={selectedChunksForTranslation.includes(id)}
          onChange={handleCheckboxChange}
          disabled={isTranscribing}
        />
      </div>
      <div
        className="grid grid-cols-[auto_1fr] items-center justify-center gap-4 "
        onClick={() => {
          void handlePlayer();
        }}
      >
        <p dir="auto" className={twMerge(" text-base text-lavender-500")}>
          {speakerName}
        </p>
        <p
          dir="auto"
          className={twMerge(
            "text-base text-gray-500 dark:text-white/80",
            language === "urdu" &&
              "urdu-text text-justify text-sm leading-9 tracking-widest",
          )}
        >
          {editedText}
        </p>
      </div>

      {isEditModalOpen && (
        <UpdateTextModal
          chunkId={id}
          text={editedText}
          closeModal={() => {
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SingleTranscriptionText;
