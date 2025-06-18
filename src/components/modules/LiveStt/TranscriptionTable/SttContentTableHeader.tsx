import { SingleTranscriptionType } from "../../../../api/responseTypes/liveTranscriptionsApi.types";
import { useSttLiveContext } from "../useSttLiveContext";

const SttContentTableHeader = ({
  sttData,
}: {
  sttData: Array<SingleTranscriptionType>;
}) => {
  const { selectedTranscriptions, setSelectedTranscriptions } =
    useSttLiveContext();
  const isAllSelected = sttData.every((singleTranscription) => {
    return selectedTranscriptions.some((singleSelectedTranscription) => {
      return (
        singleSelectedTranscription.transcriptionId ===
        singleTranscription.transcriptionId
      );
    });
  });
  function handleAllChange() {
    if (isAllSelected) {
      setSelectedTranscriptions([]);
      return;
    }
    setSelectedTranscriptions(sttData);
  }
  return (
    <thead className="">
      <tr className="bg-gray-300 dark:bg-gray-800 ">
        <th></th>
        <th className="py-3">Text</th>
        <th align="left" className="ps-5">
          Sr Name
        </th>
        <th>Date</th>
        <th>Time</th>
        <th className="w-12 gap-2"></th>
        <th className="w-12 gap-2"></th>
        <th className="w-24">
          <input
            type="checkbox"
            name="selectStt"
            id="selectStt"
            className="mx-auto block h-12 accent-lavender-500 "
            checked={isAllSelected}
            onChange={handleAllChange}
          />
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default SttContentTableHeader;
