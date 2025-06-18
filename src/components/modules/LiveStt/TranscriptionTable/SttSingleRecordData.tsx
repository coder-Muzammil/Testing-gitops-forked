import { useSearchParams } from "react-router-dom";
import { SingleTranscriptionType } from "../../../../api/responseTypes/liveTranscriptionsApi.types";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { useSttLiveContext } from "../useSttLiveContext";
import { useEffect, useRef, useState } from "react";
import { highlightQueryInText } from "../../../../utils/helpers";
import TypeWriter from "./TypeWriter";
import { MdOutlineStarRate } from "react-icons/md";
import ChunkPlay from "../../chunkPlay/ChunkPlay";
import { FaEdit } from "react-icons/fa";
import Portal from "../../../primitives/Portal";
import { TextEditor } from "./OneMinuteSttContent";
import { twMerge } from "tailwind-merge";

const SttSingleRecordData = ({
  singleTranscription,
}: {
  singleTranscription: SingleTranscriptionType;
}) => {
  const {
    transcriptionId,
    createdAt,
    transcription,
    channelLogo,
    startTime,
    speakerName,
    mediaChunk,
  } = singleTranscription;
  const [isCenter, setIsCenter] = useState(false);

  const rowRef = useRef<HTMLTableRowElement>(null);
  const [searchParams] = useSearchParams();
  const {
    selectedTranscriptions,
    setSelectedTranscriptions,
    isStarPlayModalOpen,
    setIsStarPlayModalOpen,
    setPlayTimeSttRecordDataForStarPlay,
  } = useSttLiveContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editText, setEditText] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";

  const { formatDate, secondsTo12HourTimeString } = useDateTimeUtils();

  const date = formatDate(createdAt);

  const isSelected = selectedTranscriptions.some((singleTranscription) => {
    return singleTranscription.transcriptionId === transcriptionId;
  });

  function handleChange() {
    if (isSelected) {
      setSelectedTranscriptions((prev) => {
        return prev.filter(
          (singleSelectedTranscription) =>
            singleSelectedTranscription.transcriptionId !== transcriptionId,
        );
      });
      return;
    }
    setSelectedTranscriptions((prev) => {
      return [...prev, singleTranscription];
    });

    // disableLiveIfNotAlready();
  }
  const createdTime = new Date(createdAt);
  const currentTime = new Date();
  const oneMinuteBefore = new Date(currentTime.getTime() - 60000);
  const isOneMinuteBefore = createdTime < oneMinuteBefore;

  const isEvenId = transcriptionId % 2 === 0;
  useEffect(() => {
    const rowElement = rowRef.current;

    if (rowElement) {
      rowElement.scrollIntoView({
        behavior: "smooth",
        block: isCenter ? "center" : "start",
      });
    }
  }, [isCenter]);
  return (
    <>
      <div
        ref={rowRef}
        key={`perMinute-${String(transcriptionId)}`}
        className={twMerge(
          "flex items-center justify-between gap-6 px-3 py-2 dark:bg-slate-700",
          isEvenId && "bg-white",
        )}
      >
        <div className="w-16">
          <img
            src={channelLogo}
            alt="Channel Image"
            className="inline w-full rounded-lg"
          />
        </div>

        <div className="flex-1 flex-wrap">
          {isOneMinuteBefore ? (
            <p
              className="urdu-text text-justify leading-9 tracking-widest"
              dir="auto"
              dangerouslySetInnerHTML={{
                __html: highlightQueryInText({
                  text: transcription,
                  query: searchQuery,
                }),
              }}
            />
          ) : (
            <TypeWriter text={transcription} />
          )}
        </div>

        <h3 className="w-44 whitespace-nowrap text-center">{speakerName}</h3>
        <h3 className="w-28 whitespace-nowrap text-center">
          {formatDate(createdAt)}
        </h3>
        <h3 className="w-32 whitespace-nowrap text-center">
          {secondsTo12HourTimeString(startTime)}
        </h3>

        <div
          className="w-12 cursor-pointer text-center"
          onClick={() => {
            setIsStarPlayModalOpen(true);
            setPlayTimeSttRecordDataForStarPlay({
              channelName: singleTranscription.channelName,
              time: String(startTime),
              date: date,
            });
            setIsCenter(true);
          }}
        >
          <MdOutlineStarRate size={26} />
        </div>

        <div className="relative w-8 text-center">
          <ChunkPlay
            mediaChunk={mediaChunk}
            key={transcriptionId}
            isStarPlayModalOpen={isStarPlayModalOpen}
          />
        </div>

        <h3 className="w-8 text-center">
          <input
            type="checkbox"
            name="selectStt"
            id="selectStt"
            className="mx-auto block accent-lavender-500"
            checked={isSelected}
            onChange={handleChange}
          />
        </h3>

        <div className="w-8 text-center">
          <button
            className="text-xl text-gray-500"
            onClick={() => {
              setEditText(transcription);
              setEditId(transcriptionId);
              setIsEditorOpen(true);
            }}
          >
            <FaEdit />
          </button>
        </div>
      </div>

      {/* {isStarPlayModalOpen && (
        <StarPlay
          setIsStarPlayModalOpen={setIsStarPlayModalOpen}
          channelName={singleTranscription.channelName}
          time={startTime}
          date={date}
          source="stt"
        />
      )} */}

      {isEditorOpen && editId && (
        <Portal>
          <TextEditor
            text={editText}
            setIsEditorOpen={setIsEditorOpen}
            transcriptionId={editId}
          />
        </Portal>
      )}
    </>
  );
};

export default SttSingleRecordData;
