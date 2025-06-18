import { SingleFlasherType } from "../../../api/responseTypes/getFlashersApi.types";
import useFlasherContext from "./useFlasherContext";

const FlashersHeadlinesTableHeader = ({
  headlines = [],
}: {
  headlines: Array<SingleFlasherType>;
}) => {
  const { selectedFlashersHeadlines, setSelectedFlashersHeadlines } =
    useFlasherContext();

  const handleSelectAllHeadlines = () => {
    if (selectedFlashersHeadlines.length === headlines.length) {
      setSelectedFlashersHeadlines([]);
    } else {
      setSelectedFlashersHeadlines(headlines);
    }
  };

  const isAllHeadlinesSelected =
    selectedFlashersHeadlines.length === headlines.length;
  return (
    <thead>
      <tr className="bg-gray-300">
        <th className="py-3"></th>
        <th className="py-3">Text</th>
        <th>Time</th>
        <th className="w-24 text-center">
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

export default FlashersHeadlinesTableHeader;
