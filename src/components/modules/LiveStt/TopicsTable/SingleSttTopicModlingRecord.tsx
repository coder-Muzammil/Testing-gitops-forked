import { MdOutlineStarRate } from "react-icons/md";
import TopicFieldEnglish from "./TopicFieldEnglish";
import TopicFieldUrdu from "./TopicFieldUrdu";
import { FaEdit } from "react-icons/fa";
import StarPlay from "../../StarPlay/StarPlay";
import { useSttLiveContext } from "../useSttLiveContext";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { useState } from "react";
import { SingleTopicType } from "../../../../api/responseTypes/getLiveSttTopicsApi.types";
// import { verifyResourceUrlStt } from "../../../../utils/helpers";
import { OneMinuteEditorTopicDataType } from "../../../../utils/typeDefinations";
import Portal from "../../../primitives/Portal";
import OneMinuteTopicEditor from "./OneMinuteTopicEditor";

const SingleSttTopicModlingRecord = ({
  singleTopicModeling,
}: {
  singleTopicModeling: SingleTopicType;
}) => {
  const { selectedTopics, setSelectedTopics } = useSttLiveContext();
  const { formatDate, secondsTo12HourTimeString, extractTimeFromDateString } =
    useDateTimeUtils();
  const [isStarPlayModalOpen, setIsStarPlayModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [topicData, setTopicData] = useState<OneMinuteEditorTopicDataType>({
    topicRecordId: 0,
    topicUrdu: "",
    topicEnglish: "",
    summaryUrdu: "",
    summaryEnglish: "",
  });

  const {
    topicEnglish,
    summaryEnglish,
    topicUrdu,
    summaryUrdu,
    topicRecordId,
    channelLogo,
    channelName,
    createdAt,
    startSeconds,
  } = singleTopicModeling;
  const isSelected = selectedTopics.some((singleTopicModeling) => {
    return singleTopicModeling.topicRecordId === topicRecordId;
  });
  function topicDataChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setTopicData({ ...topicData, [name]: value });
  }
  function handleChange() {
    if (isSelected) {
      setSelectedTopics((prev) => {
        return prev.filter(
          (singleSelectedTopic) =>
            singleSelectedTopic.topicRecordId !== topicRecordId,
        );
      });
      return;
    }
    setSelectedTopics((prev) => {
      return [...prev, singleTopicModeling];
    });
  }
  return (
    <>
      <tr key={topicRecordId} className="border-b even:bg-gray-100 ">
        <td className="px-4 py-2 text-center ">
          <div className="w-16">
            <img
              src={channelLogo}
              alt="Channel Image"
              className="w-full rounded-lg"
            />
          </div>
        </td>
        <td className="space-y-4 px-6 py-6">
          <TopicFieldEnglish topic={topicEnglish} summary={summaryEnglish} />
        </td>
        <td className="px-6 py-6">
          {/* <TopicFieldUrdu topic={topicUrdu} summary={summaryUrdu} /> */}
          <TopicFieldUrdu topic="" summary="" />
        </td>
        <td className="px-6 py-6">
          <p className="whitespace-nowrap">{formatDate(createdAt)}</p>
        </td>
        <td className="">
          <div className="whitespace-nowrap text-center">
            <p className="">{secondsTo12HourTimeString(startSeconds)}</p>
          </div>
        </td>

        <td
          className="  cursor-pointer px-3 text-center"
          onClick={() => {
            setIsStarPlayModalOpen(true);
          }}
        >
          <MdOutlineStarRate size={26} />
        </td>

        <td className="">
          <input
            type="checkbox"
            name="selectTopicRecord"
            id="selectTopicRecord"
            className="mx-auto block accent-lavender-500"
            checked={isSelected}
            onChange={handleChange}
          />
        </td>
        <th className="px-4">
          <button
            className="text-xl text-gray-500"
            onClick={() => {
              setIsEditorOpen(true);
              const data = {
                topicRecordId,
                topicEnglish,
                summaryUrdu,
                summaryEnglish,
                topicUrdu,
              };
              setTopicData(data);
            }}
          >
            <FaEdit />
          </button>
        </th>
      </tr>
      {isEditorOpen && (
        <Portal>
          <OneMinuteTopicEditor
            oneMinuteTopicData={topicData}
            setIsEditorOpen={setIsEditorOpen}
            onChange={topicDataChangeHandler}
          />
        </Portal>
      )}
      {isStarPlayModalOpen && (
        <StarPlay
          setIsStarPlayModalOpen={setIsStarPlayModalOpen}
          channelName={channelName}
          time={extractTimeFromDateString(createdAt)}
          date={formatDate(createdAt)}
          source="topicModeling"
        />
      )}
    </>
  );
};

export default SingleSttTopicModlingRecord;
