import { baseServiceUrlFileAccess } from "../../../../api/apiConstants";
import { SingleTickerType } from "../../../../api/responseTypes/getAllTickersApi.types";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import useTickersContext from "../useTickersContext";

const TickersHeadlinesTableBodyRow = ({ item }: { item: SingleTickerType }) => {
  const { recordId, ocrResult, dateTime } = item;
  const { formatTime } = useDateTimeUtils();
  const { selectedTickersHeadlines, setSelectedTickersHeadlines } =
    useTickersContext();

  const handleCheckboxChange = () => {
    setSelectedTickersHeadlines((prev) => {
      if (prev.find((t) => t.recordId === recordId)) {
        return prev.filter((t) => t.recordId !== recordId);
      } else {
        return [...prev, item];
      }
    });
  };

  const isAllHeadlinesSelected = selectedTickersHeadlines.some(
    (t) => t.recordId === recordId,
  );

  return (
    <tr key={recordId} className="odd:bg-gray-100">
      <td className="px-8 py-2 text-center">
        <div className="w-16">
          <img
            src={baseServiceUrlFileAccess + (item.channel.channelLogo ?? "")}
            alt="Channel Image"
            className="inline w-full rounded-lg"
          />
        </div>
      </td>
      <td className="px-6 py-3">
        <p
          dir="auto"
          className="urdu-text text-justify leading-9 tracking-widest"
        >
          {ocrResult}
        </p>
      </td>

      <td className="whitespace-nowrap px-3 text-center">
        {formatTime(dateTime)}
      </td>
      <td className="text-center">
        <input
          type="checkbox"
          id={`headlines-${String(recordId)}`}
          name="playTimeHeadlinesNews"
          checked={isAllHeadlinesSelected}
          onChange={handleCheckboxChange}
        />
      </td>
    </tr>
  );
};

export default TickersHeadlinesTableBodyRow;
