import { useState } from "react";
import { SttUploadContext } from "./useSttUploadContext";
import { TranscriptionType } from "../../../api/useGetTranscribedVideoData.types";

function SttUploadContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUpdateDictionaryModalOpen, setIsUpdateDictionaryModalOpen] =
    useState(false);
  const [isViewDictionaryModalOpen, setIsViewDictionaryModalOpen] =
    useState(false);
  const [selectedChunksForTranslation, setSelectedChunksForTranslation] =
    useState<Array<number>>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedSttUploadsHeadlines, setSelectedSttUploadsHeadlines] =
    useState<Array<TranscriptionType>>([]);
  return (
    <SttUploadContext.Provider
      value={{
        isUpdateDictionaryModalOpen,
        setIsUpdateDictionaryModalOpen,
        isViewDictionaryModalOpen,
        setIsViewDictionaryModalOpen,
        selectedChunksForTranslation,
        setSelectedChunksForTranslation,
        isTranscribing,
        setIsTranscribing,
        selectedSttUploadsHeadlines,
        setSelectedSttUploadsHeadlines,
      }}
    >
      {children}
    </SttUploadContext.Provider>
  );
}
export default SttUploadContextComponent;
