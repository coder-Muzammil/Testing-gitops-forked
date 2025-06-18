import { useRef, useState } from "react";
import { SingleTranscriptionType } from "../../../api/responseTypes/liveTranscriptionsApi.types";
import { SingleTopicType } from "../../../api/responseTypes/getLiveSttTopicsApi.types";
import { SttLiveContext } from "./useSttLiveContext";

function SttLiveContextComponent({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [selectedTranscriptions, setSelectedTranscriptions] = useState<
    Array<SingleTranscriptionType>
  >([]);
  const [isStarPlayModalOpen, setIsStarPlayModalOpen] = useState(false);
  const [isPlayTimeStarPlayModalOpen, setIsPlayTimeStarPlayModalOpen] =
    useState(false);
  const [selectedTopics, setSelectedTopics] = useState<Array<SingleTopicType>>(
    [],
  );
  const [selectedHeadlines, setSelectedHeadlines] = useState<
    Array<SingleTranscriptionType>
  >([]);

  const [
    playTimeSttRecordDataForStarPlay,
    setPlayTimeSttRecordDataForStarPlay,
  ] = useState({
    channelName: "",
    time: "",
    date: "",
  });

  const [
    transcriptionsIdsForApplyDictionary,
    setTranscriptionsIdsForApplyDictionary,
  ] = useState<Array<number>>([]);

  return (
    <SttLiveContext.Provider
      value={{
        playerRef,
        selectedTranscriptions: selectedTranscriptions,
        setSelectedTranscriptions: setSelectedTranscriptions,
        selectedTopics: selectedTopics,
        setSelectedTopics: setSelectedTopics,
        selectedHeadlines: selectedHeadlines,
        setSelectedHeadlines: setSelectedHeadlines,
        playTimeSttRecordDataForStarPlay: playTimeSttRecordDataForStarPlay,
        setPlayTimeSttRecordDataForStarPlay:
          setPlayTimeSttRecordDataForStarPlay,
        transcriptionsIdsForApplyDictionary:
          transcriptionsIdsForApplyDictionary,
        setTranscriptionsIdsForApplyDictionary:
          setTranscriptionsIdsForApplyDictionary,
        isStarPlayModalOpen: isStarPlayModalOpen,
        setIsStarPlayModalOpen: setIsStarPlayModalOpen,
        isPlayTimeStarPlayModalOpen: isPlayTimeStarPlayModalOpen,
        setIsPlayTimeStarPlayModalOpen: setIsPlayTimeStarPlayModalOpen,
      }}
    >
      {children}
    </SttLiveContext.Provider>
  );
}
export default SttLiveContextComponent;
