import { SingleTickerType } from "../../../api/responseTypes/getAllTickersApi.types";
import useTickersContext from "./useTickersContext";

function TickersTableHeader({
  tickers,
}: {
  tickers: Array<SingleTickerType> | undefined;
}) {
  const { selectedTickers, setSelectedTickers } = useTickersContext();

  const handleSelectAll = () => {
    const areAllSelected = selectedTickers.length === tickers?.length;
    setSelectedTickers(areAllSelected ? [] : tickers ?? []);
  };

  const areAllTickersInSelectedTickers = tickers?.every((ticker) => {
    return selectedTickers.some(
      (selectedTickers) => selectedTickers.recordId === ticker.recordId,
    );
  });
  return (
    <thead>
      <tr className="position-sticky top-0 overflow-hidden rounded-md bg-gray-100 dark:bg-slate-700 dark:text-white">
        <th className="">Channel</th>
        <th className="w-[500px] py-1 2xl:w-[1000px] 2xl:py-3 ">Tickers</th>
        <th>Date</th>
        <th>Time</th>
        <th></th>
        <th></th>
        <th></th>
        <th>
          <input
            type="checkbox"
            name="select"
            id="select"
            className="mx-auto block aspect-square w-4 accent-lavender-500"
            checked={areAllTickersInSelectedTickers}
            onChange={handleSelectAll}
          />
        </th>
      </tr>
    </thead>
  );
}
export default TickersTableHeader;
