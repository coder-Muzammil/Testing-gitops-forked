import { SingleTopicType } from "../../../../api/responseTypes/getLiveSttTopicsApi.types";
import { useSttLiveContext } from "../useSttLiveContext";

const SttTopicModlingTableHeader = ({
  sttTopicData,
}: {
  sttTopicData: Array<SingleTopicType>;
}) => {
  const { selectedTopics, setSelectedTopics } = useSttLiveContext();
  const isAllSelected = sttTopicData.every((singleSttTopic) => {
    return selectedTopics.some((singleSelectedSttTopic) => {
      return (
        singleSelectedSttTopic.topicRecordId === singleSttTopic.topicRecordId
      );
    });
  });
  function handleAllChange() {
    if (isAllSelected) {
      setSelectedTopics([]);
      return;
    }
    setSelectedTopics(sttTopicData);
  }
  return (
    <thead>
      <tr className="bg-gray-300">
        <th></th>
        <th className="py-3">English</th>
        <th></th>
        {/* <th>Urdu</th> */}
        <th>Date</th>
        <th>Time Span</th>
        <th className="w-12 gap-2"></th>
        <th className="w-20">
          <input
            type="checkbox"
            name="selectTopicRecord"
            id="selectTopicRecord"
            className="mx-auto block accent-lavender-500"
            checked={isAllSelected}
            onChange={handleAllChange}
          />
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default SttTopicModlingTableHeader;
