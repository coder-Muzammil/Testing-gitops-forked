import { twMerge } from "tailwind-merge";
import { useSttLiveContext } from "./useSttLiveContext";
import { useState } from "react";
import CreateSttModal from "./TranscriptionTable/CreateSttModal";

function DownloadSelectedDataButton() {
  const {
    selectedTranscriptions: selectedOneMinuteSttData,
    selectedTopics: selectedThreeMinuteTopicData,
  } = useSttLiveContext();

  const [isDownloadContentModalOpen, setIsDownloadContentModalOpen] =
    useState(false);

  const noDataSelected =
    selectedOneMinuteSttData.length === 0 &&
    selectedThreeMinuteTopicData.length === 0;

  return (
    <div className={twMerge(noDataSelected && "invisible")}>
      <button
        className={twMerge(
          " h-7 cursor-pointer rounded-lg bg-lavender-600 px-3  text-sm text-white ",
        )}
        onClick={() => {
          setIsDownloadContentModalOpen(true);
        }}
        disabled={selectedOneMinuteSttData.length === 0}
      >
        Save
        <span className="mx-2  rounded-sm bg-lavender-500 px-2 py-1 text-white">
          {selectedOneMinuteSttData.length ||
            selectedThreeMinuteTopicData.length ||
            0}
        </span>
      </button>
      {isDownloadContentModalOpen && (
        <CreateSttModal
          setIsCreateSttModalOpen={setIsDownloadContentModalOpen}
        />
      )}
    </div>
  );
}
export default DownloadSelectedDataButton;
