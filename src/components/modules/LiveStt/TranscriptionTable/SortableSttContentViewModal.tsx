import { useSttLiveContext } from "../useSttLiveContext";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";

function SortableSttContentViewModal({
  setIsCreateSttModalOpen,
}: {
  setIsCreateSttModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { selectedTranscriptions, setSelectedTranscriptions } =
    useSttLiveContext();
  const { formatTime, formatDate } = useDateTimeUtils();
  const handleRemoveTranscription = (id: number) => {
    const updatedTickers = selectedTranscriptions.filter(
      (transcription) => transcription.transcriptionId !== id,
    );
    setSelectedTranscriptions(updatedTickers);

    if (updatedTickers.length === 0) {
      setIsCreateSttModalOpen(false);
    }
  };
  return (
    <div className="overflow-auto">
      {selectedTranscriptions.map((stt) => (
        <div
          className="relative mb-1 grid h-fit grid-cols-[auto_1fr] gap-1 bg-gray-200/40 dark:bg-gray-600 dark:text-white"
          key={stt.transcriptionId}
        >
          <div className="grid grid-rows-[1fr_auto] gap-1">
            {/* Container to ensure equal height for image and div */}
            <div className="h-[100px] w-[100px]">
              <img
                id="collage"
                src={stt.channelLogo}
                alt="Channel Image"
                className="h-24 w-24 rounded-sm"
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <div>
                <p className="text-center"> {formatDate(stt.createdAt)}</p>
                <p className="text-center">{formatTime(stt.createdAt)}</p>
              </div>
            </div>
          </div>
          <button
            className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xl text-white"
            onClick={() => {
              handleRemoveTranscription(stt.transcriptionId);
            }}
          >
            &times;
          </button>
          <div className="flex w-full flex-col items-end justify-center  px-2 py-1">
            <p
              dir="auto"
              className="font-aslam text-2xl font-semibold leading-5 tracking-wider text-gray-600"
            >
              {stt.transcription}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SortableSttContentViewModal;
