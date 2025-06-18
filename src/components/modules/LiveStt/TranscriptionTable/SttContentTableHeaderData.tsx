import { SingleTranscriptionType } from "../../../../api/responseTypes/liveTranscriptionsApi.types";
import { useSttLiveContext } from "../useSttLiveContext";

const SttContentTableHeaderData = ({
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
    <div className="mt-8 flex items-center justify-between gap-6 bg-gray-300 px-6 py-4 text-center font-bold dark:bg-slate-600">
      <div className="w-16"></div>
      <h3 className="flex-1">Text</h3>
      <h3 className="w-44 text-center">Sr Name</h3>
      <h3 className="w-28 text-center">Date</h3>
      <h3 className="w-32 text-center">Timeٖ</h3>
      <h3 className="w-12 text-center"></h3>
      <h3 className="w-8 text-center"></h3>
      <div className="w-8 text-center">
        <input
          type="checkbox"
          name="selectStt"
          id="selectStt"
          className="mx-auto block h-12 accent-lavender-500 "
          checked={isAllSelected}
          onChange={handleAllChange}
        />
      </div>
      <h3 className="w-8 text-center">edit</h3>
    </div>
  );
};

export default SttContentTableHeaderData;
