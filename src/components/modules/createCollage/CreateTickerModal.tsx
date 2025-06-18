import { useClickAway } from "@uidotdev/usehooks";
import Portal from "../../primitives/Portal";
import HeaderCollageCreateModal from "./HeaderCollageCreateModal";
import SortableTickersCollageViewModal from "./SortableTickersCollageViewModal";
import useTickersContext from "../Tickers/useTickersContext";

function CreateTickerModal({
  setIsCreateTickerModalOpen,
}: {
  setIsCreateTickerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setTickersIdsForTranslation } = useTickersContext();
  const ref = useClickAway(() => {
    setIsCreateTickerModalOpen(false);
    setTickersIdsForTranslation([]);
  });
  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
        <div
          className="grid max-h-[95vh] w-9/12 grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white p-3 dark:bg-gray-800"
          ref={ref as React.MutableRefObject<HTMLDivElement>}
        >
          <HeaderCollageCreateModal
            setIsCreateTickerModalOpen={setIsCreateTickerModalOpen}
          />
          <SortableTickersCollageViewModal
            setIsCreateTickerModalOpen={setIsCreateTickerModalOpen}
          />
        </div>
      </div>
    </Portal>
  );
}

export default CreateTickerModal;
