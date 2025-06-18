import { SingleTranscriptionType } from "../../../../api/responseTypes/liveTranscriptionsApi.types";
import SttContentTableDataBody from "./SttContentTableDataBody";
import SttContentTableHeaderData from "./SttContentTableHeaderData";

const SttContentTableData = ({
  sttData,
}: {
  sttData: Array<SingleTranscriptionType>;
  // observerRef: (node: HTMLDivElement | null) => void;
  // hasNextPage: boolean;
  // isFetchingNextPage: boolean;
  // dataLength: number;
  // isSort: boolean;
}) => {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-2 bg-gray-50 py-2">
      <SttContentTableHeaderData sttData={sttData} />
      <SttContentTableDataBody
        sttData={sttData}
      />
    </div>
  );
};

export default SttContentTableData;
