import { MdOutlineStarRate } from "react-icons/md";
import { SingleTranscriptionType } from "../../../api/responseTypes/liveTranscriptionsApi.types";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import { useSttLiveContext } from "../LiveStt/useSttLiveContext";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import usePatchSttPlayTimeData from "../../../api/usePatchSttHeadlinesData";
import EditSinglePlayTimeRow, {
  UpdatedPlayTimeDataMethodPropsType,
} from "./EditSinglePlayTimeRow";
import ChunkPlay from "../chunkPlay/ChunkPlay";
const HeadlinesTableBodyRow = ({ item }: { item: SingleTranscriptionType }) => {
  const {
    transcriptionId,
    transcription,
    channelLogo,
    startTime,
    channelName,
    createdAt,
    mediaChunk,
  } = item;
  const { secondsTo12HourTimeString, formatDate } = useDateTimeUtils();
  const {
    selectedHeadlines,
    setSelectedHeadlines,
    setPlayTimeSttRecordDataForStarPlay,
    setIsPlayTimeStarPlayModalOpen,
    isStarPlayModalOpen,
  } = useSttLiveContext();
  const [edittedRowId, setEdittedRowId] = useState<number | null>(null);

  const { mutate: patchSttPlayTimeData, isPending } = usePatchSttPlayTimeData();
  const handleCheckboxChange = () => {
    setSelectedHeadlines((prev) => {
      if (prev.find((t) => t.transcriptionId === transcriptionId)) {
        return prev.filter((t) => t.transcriptionId !== transcriptionId);
      } else {
        return [...prev, item];
      }
    });
  };

  const isTranscriptionSelected = selectedHeadlines.some(
    (t) => t.transcriptionId === transcriptionId,
  );

  const handleUpdateSttPlaytimeData = (
    data: UpdatedPlayTimeDataMethodPropsType,
  ) => {
    patchSttPlayTimeData(data);
    // setIsOpenEditorModal(false);
    setEdittedRowId(null);
  };

  return (
    <>
      <tr
        key={transcriptionId}
        className=" odd:bg-gray-100 dark:text-white/80 dark:odd:bg-gray-800"
      >
        <td className="mx-4py-2 px-8 text-center">
          <div className="w-16">
            <img
              src={channelLogo}
              alt="Channel Image"
              className="inline w-full rounded-lg"
            />
          </div>
        </td>

        <td className="px-6 py-3">
          {edittedRowId === transcriptionId ? (
            <EditSinglePlayTimeRow
              text={transcription}
              id={transcriptionId}
              updatePlayTimeData={handleUpdateSttPlaytimeData}
              isPending={isPending}
              setEdittedRowId={setEdittedRowId}
            />
          ) : (
            <p
              dir="auto"
              className="urdu-text text-justify leading-9 tracking-widest"
            >
              {transcription}
            </p>
          )}
        </td>

        <td className="whitespace-nowrap px-5 text-center">
          {secondsTo12HourTimeString(startTime)}
        </td>
        <td
          className="w-12 cursor-pointer px-5"
          align="center"
          onClick={() => {
            setIsPlayTimeStarPlayModalOpen(true);
            setPlayTimeSttRecordDataForStarPlay({
              channelName,
              time: String(startTime),
              date: formatDate(createdAt),
            });
          }}
        >
          <MdOutlineStarRate title="Star Play" size={26} />
        </td>

        <td className="relative text-center">
          <ChunkPlay
            mediaChunk={mediaChunk}
            key={transcriptionId}
            isStarPlayModalOpen={isStarPlayModalOpen}
          />
        </td>

        <td
          className="w-12 cursor-pointer px-5"
          align="center"
          onClick={() => {
            // setIsOpenEditorModal(true);
            setEdittedRowId(transcriptionId);
          }}
        >
          <FaRegEdit title="Edit Row" size={21} />
        </td>
        <td className="w-16 cursor-pointer" align="center">
          <input
            type="checkbox"
            id={`headlines-${String(transcriptionId)}`}
            name="playTimeHeadlinesNews"
            checked={isTranscriptionSelected}
            onChange={handleCheckboxChange}
          />
        </td>
      </tr>

      {/* {isOpenEditorModal && (
        <UpdatePlayTimeRowData
          text={transcription}
          setIsOpenEditorModal={setIsOpenEditorModal}
          id={transcriptionId}
          updatePlayTimeData={handleUpdateSttPlaytimeData}
          isPending={isPending}
        />
      )} */}
    </>
  );
};

export default HeadlinesTableBodyRow;
