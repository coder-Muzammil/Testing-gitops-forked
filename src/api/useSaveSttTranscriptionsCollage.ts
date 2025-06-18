import { useMutation } from "@tanstack/react-query";
import { saveSttTranscriptions } from "./apiConstants";
import { useAxiosPrivate } from "./useAxiosPrivate";

function useSaveSttTranscriptionsCollage() {
  const axiosPrivate = useAxiosPrivate();

  function saveCollageFn({
    collageName,
    collageImage,
    sttIds,
    count,
    source,
  }: {
    collageName: string;
    collageImage: File;
    sttIds: Array<number>;
    count: number;
    source: string;
  }) {
    const formData = new FormData();
    formData.append("transcriptionImage", collageImage);
    formData.append("transcriptionName", collageName);
    formData.append("count", String(count));
    formData.append("source", source);
    formData.append("sttIds", sttIds.join(","));
    return axiosPrivate.post(saveSttTranscriptions, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  return useMutation({
    mutationKey: ["sttTranscriptionsCollage"],
    mutationFn: saveCollageFn,
  });
}
export default useSaveSttTranscriptionsCollage;
