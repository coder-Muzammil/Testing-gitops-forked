import React, { MutableRefObject } from "react";
import Portal from "../../primitives/Portal";
import HeaderMosaicViewerModal from "./HeaderMosaicViewerModal";
import { useClickAway } from "@uidotdev/usehooks";
import { useQueryClient } from "@tanstack/react-query";
import useGetSingleMosaic from "../../../api/useGetSingleMosaic";
import { SingleMosaicType } from "../../../api/responseTypes/getAllMosaicsApi.types";
import MosaicViewer from "./MosaicViewer";
type MosaicViewModalPropsType = {
  setIsMosaicModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mosaicId: number;
};

function MosaicViewModal(props: MosaicViewModalPropsType) {
  const { setIsMosaicModalOpen, mosaicId } = props;
  const queryClient = useQueryClient();
  const ref = useClickAway(() => {
    setIsMosaicModalOpen(false);
    queryClient
      .invalidateQueries({
        queryKey: ["getSingleMosaic", mosaicId],
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  });

  const { data, isLoading, isError } = useGetSingleMosaic(mosaicId);

  if (isLoading) {
    return (
      <Portal>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="flex max-h-[80vh] w-9/12 flex-col items-center justify-center rounded-md bg-white p-3">
            <p>loading...</p>
            <button
              type="button"
              onClick={() => {
                setIsMosaicModalOpen(false);
              }}
              className="font-bold text-lavender-700 underline"
            >
              Close
            </button>
          </div>
        </div>
      </Portal>
    );
  }
  if (isError) {
    return (
      <Portal>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="flex max-h-[80vh] w-9/12 flex-col items-center justify-center rounded-md bg-white p-3">
            <p>Error Fetching data</p>
            <button
              type="button"
              onClick={() => {
                setIsMosaicModalOpen(false);
              }}
              className="font-bold text-lavender-400"
            >
              Close
            </button>
          </div>
        </div>
      </Portal>
    );
  }

  // TODO : pull error and loading state to the top
  if (!data) {
    return (
      <Portal>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div
            className="flex max-h-[80vh] w-9/12 items-center justify-center rounded-md bg-white p-3"
            ref={ref as MutableRefObject<HTMLDivElement>}
          >
            No data
          </div>
        </div>
      </Portal>
    );
  }

  const mosaicData: SingleMosaicType = data.data;

  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
        <div
          className="grid max-h-[80vh] w-9/12 grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white p-3 dark:bg-gray-800"
          ref={ref as MutableRefObject<HTMLDivElement>}
        >
          <HeaderMosaicViewerModal mosaicData={mosaicData} />
          <MosaicViewer mosaicData={mosaicData} />
        </div>
      </div>
    </Portal>
  );
}
export default MosaicViewModal;
