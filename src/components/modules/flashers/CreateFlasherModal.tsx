import { useClickAway } from "@uidotdev/usehooks";
import Portal from "../../primitives/Portal";
import { MutableRefObject } from "react";
import SortableFlashersCollageViewModal from "./SortableFlashersCollageViewModal";
import HeaderFlasherCollageCreateModal from "./HeaderFlasherCollageCreateModal";
const CreateFlasherModal = ({
  setIsCreateFlasherModalOpen,
}: {
  setIsCreateFlasherModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useClickAway(() => {
    setIsCreateFlasherModalOpen(false);
  });
  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
        <div
          className="grid max-h-[80vh] w-9/12 grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white p-3"
          ref={ref as MutableRefObject<HTMLDivElement>}
        >
          <HeaderFlasherCollageCreateModal
            setIsCreateFlasherModalOpen={setIsCreateFlasherModalOpen}
          />
          <SortableFlashersCollageViewModal />
        </div>
      </div>
    </Portal>
  );
};

export default CreateFlasherModal;
