import { SingleFlasherType } from "../../../api/responseTypes/getFlashersApi.types";
import useFlashersContext from "./useFlasherContext";

function FlasherTableHeader({
  flashers,
}: {
  flashers: Array<SingleFlasherType> | undefined;
}) {
  const { selectedFlashers, setSelectedFlashers } = useFlashersContext();

  const handleSelectAll = () => {
    const areAllSelected = selectedFlashers.length === flashers?.length;
    setSelectedFlashers(areAllSelected ? [] : flashers ?? []);
  };
  const areAllTickersInSelectedTickers = flashers?.every((flasher) => {
    return selectedFlashers.some(
      (selectedFlasher) => selectedFlasher.recordId === flasher.recordId,
    );
  });
  return (
    <thead>
      <tr className="overflow-hidden rounded-md bg-gray-100 dark:bg-gray-600">
        <th className="">Channel</th>
        <th className="w-[500px] py-1 2xl:w-[800px] 2xl:py-3">Flashers</th>
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
export default FlasherTableHeader;
