import { SingleTranscriptionType } from "../../../api/responseTypes/liveTranscriptionsApi.types";
import { SingleTopicType } from "../../../api/responseTypes/getLiveSttTopicsApi.types";

export type SttLiveContextType = {
  playerRef: React.MutableRefObject<HTMLVideoElement | null>;
  selectedTranscriptions: Array<SingleTranscriptionType>;
  setSelectedTranscriptions: React.Dispatch<
    React.SetStateAction<Array<SingleTranscriptionType>>
  >;
  selectedTopics: Array<SingleTopicType>;
  setSelectedTopics: React.Dispatch<
    React.SetStateAction<Array<SingleTopicType>>
  >;
  selectedHeadlines: Array<SingleTranscriptionType>;
  setSelectedHeadlines: React.Dispatch<
    React.SetStateAction<Array<SingleTranscriptionType>>
  >;
  playTimeSttRecordDataForStarPlay: {
    channelName: string;
    time: string;
    date: string;
  };
  setPlayTimeSttRecordDataForStarPlay: React.Dispatch<
    React.SetStateAction<{
      channelName: string;
      time: string;
      date: string;
    }>
  >;
  isPlayTimeStarPlayModalOpen: boolean;
  setIsPlayTimeStarPlayModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isStarPlayModalOpen: boolean;
  setIsStarPlayModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transcriptionsIdsForApplyDictionary: Array<number>;
  setTranscriptionsIdsForApplyDictionary: React.Dispatch<
    React.SetStateAction<Array<number>>
  >;
};
