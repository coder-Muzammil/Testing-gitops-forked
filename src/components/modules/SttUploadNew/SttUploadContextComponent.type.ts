import { TranscriptionType } from "../../../api/useGetTranscribedVideoData.types";

export type SttUploadContextType = {
  isUpdateDictionaryModalOpen: boolean;
  setIsUpdateDictionaryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isViewDictionaryModalOpen: boolean;
  setIsViewDictionaryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChunksForTranslation: Array<number>;
  setSelectedChunksForTranslation: React.Dispatch<
    React.SetStateAction<Array<number>>
  >;
  isTranscribing: boolean;
  setIsTranscribing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSttUploadsHeadlines: Array<TranscriptionType>;
  setSelectedSttUploadsHeadlines: React.Dispatch<
    React.SetStateAction<Array<TranscriptionType>>
  >;
};
