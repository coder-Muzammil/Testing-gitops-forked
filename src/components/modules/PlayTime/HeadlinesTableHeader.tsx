import { SingleTranscriptionType } from "../../../api/responseTypes/liveTranscriptionsApi.types";
import { useSttLiveContext } from "../LiveStt/useSttLiveContext";

const HeadlinesTableHeader = ({
  headlines,
}: {
  headlines: Array<SingleTranscriptionType>;
}) => {
  const { selectedHeadlines, setSelectedHeadlines } = useSttLiveContext();

  const handleSelectAllHeadlines = () => {
    if (selectedHeadlines.length === headlines.length) {
      setSelectedHeadlines([]);
    } else {
      setSelectedHeadlines(headlines);
    }
  };

  const isAllHeadlinesSelected = selectedHeadlines.length === headlines.length;
  return (
    <thead>
      <tr className=" bg-gray-300 dark:bg-gray-800 dark:text-white/80">
        <th className="py-3"></th>
        <th className="py-3">Text</th>
        <th>Time</th>
        <th></th>
        <th></th>
        <th></th>

        <th className="w-16 cursor-pointer" align="center">
          <input
            type="checkbox"
            id="headlines-select-all"
            name="headlinesNewsSelectAll"
            checked={isAllHeadlinesSelected}
            onChange={handleSelectAllHeadlines}
          />
        </th>
      </tr>
    </thead>
  );
};

export default HeadlinesTableHeader;
