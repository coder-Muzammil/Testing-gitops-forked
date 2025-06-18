import { SingleTranscriptionType } from "../../../../api/responseTypes/liveTranscriptionsApi.types";
import { highlightQueryInText } from "../../../../utils/helpers";
import { useSttLiveContext } from "../useSttLiveContext";
import { useSearchParams } from "react-router-dom";
import TypeWriter from "./TypeWriter";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Portal from "../../../primitives/Portal";
import { TextEditor } from "./OneMinuteSttContent";
import { MdOutlineStarRate } from "react-icons/md";
import ChunkPlay from "../../chunkPlay/ChunkPlay";
const SingleSttRecord = ({
  singleTranscription,
}: {
  singleTranscription: SingleTranscriptionType;
}) => {
  const {
    selectedTranscriptions,
    setSelectedTranscriptions,
    isStarPlayModalOpen,
    setIsStarPlayModalOpen,
  } = useSttLiveContext();
  const { formatDate, secondsTo12HourTimeString } = useDateTimeUtils();
  const [searchParams] = useSearchParams();
  const { setPlayTimeSttRecordDataForStarPlay } = useSttLiveContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editText, setEditText] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";

  const {
    transcriptionId,
    createdAt,
    transcription,
    channelLogo,
    startTime,
    speakerName,
    mediaChunk,
  } = singleTranscription;
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
  return (
    <tr
      key={`perMinute-${String(transcriptionId)}`}
      className="even:bg-gray-100 dark:even:bg-gray-800"
    >
      <td className="px-8 py-2 text-center">
        <div className="w-16">
          <img
            src={channelLogo}
            alt="Channel Image"
            className="inline w-full rounded-lg"
          />
        </div>
      </td>
      <td className="px-6 py-3">
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
      </td>
      <td className="whitespace-nowrap px-3 text-start">{speakerName}</td>
      <td className="whitespace-nowrap px-3 text-center">
        {formatDate(createdAt)}
      </td>
      <td className="whitespace-nowrap px-3 text-center">
        {secondsTo12HourTimeString(startTime)}
      </td>
      <td
        className="gap-  w-12 cursor-pointer "
        onClick={() => {
          setIsStarPlayModalOpen(true);
          setPlayTimeSttRecordDataForStarPlay({
            channelName: singleTranscription.channelName,
            time: String(startTime),
            date: date,
          });
        }}
      >
        <MdOutlineStarRate size={26} />
      </td>
      <td className="relative text-center">
        <ChunkPlay
          mediaChunk={mediaChunk}
          key={transcriptionId}
          isStarPlayModalOpen={isStarPlayModalOpen}
        />
      </td>
      <td className="text-center">
        <input
          type="checkbox"
          name="selectStt"
          id="selectStt"
          className="mx-auto block accent-lavender-500"
          checked={isSelected}
          onChange={handleChange}
        />
      </td>
      <td className="px-4 text-center">
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
      </td>
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
    </tr>
  );
};

export default SingleSttRecord;
