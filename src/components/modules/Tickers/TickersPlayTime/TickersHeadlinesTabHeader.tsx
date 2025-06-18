import { SingleTickerType } from "../../../../api/responseTypes/getAllTickersApi.types";
import useTickersContext from "../useTickersContext";

const TickersHeadlinesTableHeader = ({
  headlines = [],
}: {
  headlines: Array<SingleTickerType>;
}) => {
  const { selectedTickersHeadlines, setSelectedTickersHeadlines } =
    useTickersContext();

  const handleSelectAllHeadlines = () => {
    if (selectedTickersHeadlines.length === headlines.length) {
      setSelectedTickersHeadlines([]);
    } else {
      setSelectedTickersHeadlines(headlines);
    }
  };

  const isAllHeadlinesSelected =
    selectedTickersHeadlines.length === headlines.length;
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

export default TickersHeadlinesTableHeader;
