import { TranscriptionType } from "../../../../api/useGetTranscribedVideoData.types";
import SingleTranscriptionText from "../../SttUpload/SingleTranscriptionText";
import useSttUploadContext from "../useSttUploadContext";

function Transcription({
  transcription,
}: {
  transcription: Array<TranscriptionType>;
}) {
  const {
    selectedChunksForTranslation,
    setSelectedChunksForTranslation,
    setSelectedSttUploadsHeadlines,
    isTranscribing,
  } = useSttUploadContext();

  const handleSelectAll = () => {
    if (selectedChunksForTranslation.length === transcription.length) {
      setSelectedChunksForTranslation([]);
      setSelectedSttUploadsHeadlines([]);
    } else {
      const allIds = transcription.map((chunk) => chunk.id);
      setSelectedChunksForTranslation(allIds);
      setSelectedSttUploadsHeadlines(transcription);
    }
  };

  return (
    <div className="h-[83vh] max-h-screen space-y-4 overflow-auto rounded-2xl bg-gray-200 p-3 dark:bg-gray-700">
      <button
        onClick={handleSelectAll}
        className=" rounded-md bg-lavender-600 px-2 py-1 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={isTranscribing}
      >
        {selectedChunksForTranslation.length === transcription.length
          ? "Deselect All"
          : "Select All"}
      </button>
      {transcription.map((singleChunk) => {
        const { id } = singleChunk;

        return <SingleTranscriptionText key={id} chunk={singleChunk} />;
      })}
    </div>
  );
}

export default Transcription;
