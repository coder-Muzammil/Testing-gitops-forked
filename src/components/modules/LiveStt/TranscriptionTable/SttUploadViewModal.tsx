import React, { MutableRefObject } from "react";
import Portal from "../../../primitives/Portal";
import { useClickAway } from "@uidotdev/usehooks";
import useGetSingleSttVideoTranscription from "../../../../api/useGetSingleSttVideoTranscription";
import SttUploadModalHeader from "./SttUploadModalHeader";
import { SingleSttCollageType } from "../../../../api/responseTypes/getSttCollagesApi.types";
import SttUploadViewer from "./SttUploadViewer";
import { useQueryClient } from "@tanstack/react-query";

type CollageViewModalPropsType = {
  setIsSttCollageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

function SttUploadViewMoodal(props: CollageViewModalPropsType) {
  const { setIsSttCollageModalOpen, id } = props;

  const queryClient = useQueryClient();
  const ref = useClickAway(() => {
    setIsSttCollageModalOpen(false);
    queryClient
      .invalidateQueries({
        queryKey: ["getSingleSttVideoTranscription", id],
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  });

  const { data, isLoading, isError } = useGetSingleSttVideoTranscription(id);

  if (isLoading) {
    return (
      <Portal>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="flex max-h-[80vh] w-9/12 flex-col items-center justify-center rounded-md bg-white p-3">
            <p>loading...</p>
            <button
              type="button"
              onClick={() => {
                setIsSttCollageModalOpen(false);
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
                setIsSttCollageModalOpen(false);
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

  const transcriptionData: SingleSttCollageType = data.data;

  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
        <div
          className="grid max-h-[80vh] w-9/12 grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white p-3"
          ref={ref as MutableRefObject<HTMLDivElement>}
        >
          <SttUploadModalHeader transcriptionData={transcriptionData} />
          <SttUploadViewer transcriptionData={transcriptionData} />
        </div>
      </div>
    </Portal>
  );
}
export default SttUploadViewMoodal;
