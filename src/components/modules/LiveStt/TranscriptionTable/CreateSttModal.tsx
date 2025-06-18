import { useClickAway } from "@uidotdev/usehooks";
import { MutableRefObject } from "react";
import Portal from "../../../primitives/Portal";
import SortableSttContentViewModal from "./SortableSttContentViewModal";
import CreateSttModalHeader from "./CreateSttModalHeader";
import { useSearchParams } from "react-router-dom";
import TopicsContentViewModal from "../TopicsTable/TopicsContentViewModal";

function CreateSttModal({
  setIsCreateSttModalOpen,
}: {
  setIsCreateSttModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchParams] = useSearchParams();
  const contentType = searchParams.get("contentType") ?? "stt";
  const isSttSelected = contentType === "stt";
  const ref = useClickAway(() => {
    setIsCreateSttModalOpen(false);
  });

  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
        <div
          className="grid max-h-[80vh] w-9/12 grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white p-3 dark:bg-gray-800"
          ref={ref as MutableRefObject<HTMLDivElement>}
        >
          <CreateSttModalHeader
            setIsCreateSttModalOpen={setIsCreateSttModalOpen}
          />
          {isSttSelected ? (
            <SortableSttContentViewModal
              setIsCreateSttModalOpen={setIsCreateSttModalOpen}
            />
          ) : (
            <TopicsContentViewModal
              setIsCreateSttModalOpen={setIsCreateSttModalOpen}
            />
          )}
        </div>
      </div>
    </Portal>
  );
}
export default CreateSttModal;
