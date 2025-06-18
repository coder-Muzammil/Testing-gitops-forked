import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { OneMinuteEditorTopicDataType } from "../utils/typeDefinations";
import { liveSttTopics } from "./apiConstants";

export function useUpdateTopicsText() {
  return useMutation({
    mutationKey: ["updateTopicsText"],
    mutationFn: (data: OneMinuteEditorTopicDataType) => {
      const {
        topicRecordId,
        summaryEnglish,
        summaryUrdu,
        topicEnglish,
        topicUrdu,
      } = data;

      return axios.patch(`${liveSttTopics}${topicRecordId.toString()}/`, {
        summary_english: summaryEnglish,
        summary_urdu: summaryUrdu,
        topic_english: topicEnglish,
        topic_urdu: topicUrdu,
      });
    },
  });
}
