import { SingleTopicType } from "../../../../api/responseTypes/getLiveSttTopicsApi.types";
import SingleSttTopicModlingRecord from "./SingleSttTopicModlingRecord";

const SttTopicModlingDataViewTable = ({
  sttTopicData,
}: {
  sttTopicData: Array<SingleTopicType>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}) => {
  return (
    <>
      <tbody>
        {sttTopicData.map((singleTopicModeling) => {
          const { topicRecordId } = singleTopicModeling;

          return (
            <SingleSttTopicModlingRecord
              key={topicRecordId}
              singleTopicModeling={singleTopicModeling}
            />
          );
        })}
      </tbody>
    </>
  );
};

export default SttTopicModlingDataViewTable;
