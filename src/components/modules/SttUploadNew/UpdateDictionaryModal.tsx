import { MutableRefObject } from "react";
// import useSttUploadContext from "./useSttUploadContext";
import FixedInsetZeroDiv from "../../primitives/FixedInsetZeroDiv";
import { useClickAway } from "@uidotdev/usehooks";
import UpdateSttUploadText from "./UpdateSttUploadText";
import SelectSttUplaodText from "./SelectSttUplaodText";
import useDictionaryContext from "./useDictionaryContext";
const UpdateDictionaryModal = ({
  filteredData,
  videoId,
  source,
}: {
  filteredData: Array<{
    srName: string | null;
    updatedText: string | null;
  }>;
  videoId?: number;
  source: string;
}) => {
  const { setIsUpdateDictionaryModalOpen } = useDictionaryContext();
  const ref = useClickAway(() => {
    setIsUpdateDictionaryModalOpen(false);
  });

  return (
    <FixedInsetZeroDiv>
      <div
        ref={ref as MutableRefObject<HTMLDivElement>}
        className=" grid h-[90vh] w-3/4 grid-cols-[auto_1fr] rounded-lg bg-gray-200 dark:bg-gray-700"
      >
        <UpdateSttUploadText videoId={videoId} source={source} />
        <SelectSttUplaodText filteredData={filteredData} />
      </div>
    </FixedInsetZeroDiv>
  );
};

export default UpdateDictionaryModal;
