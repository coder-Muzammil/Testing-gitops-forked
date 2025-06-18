import { SingleTranscriptionType } from "../../../../api/responseTypes/liveTranscriptionsApi.types";
import SttSingleRecordData from "./SttSingleRecordData";

const SttContentTableDataBody = ({
  sttData,
}: {
  sttData: Array<SingleTranscriptionType>;
}) => {
  return (
    <div className="px-3 py-4 dark:bg-slate-700">
      <div className="flex flex-col-reverse">
        {sttData.map((item) => {
          return (
            <SttSingleRecordData
              key={item.transcriptionId}
              singleTranscription={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SttContentTableDataBody;
