import { useMutation } from "@tanstack/react-query";
import { transcribeSttVideo } from "./apiConstants";
import useProgressStore from "../stores/useSttProgress";
import { useAxiosPrivate } from "./useAxiosPrivate";
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { useRef } from "react";
import { getSafeParsedDataAndLogIfError } from "../utils/helpers";
import {
  transcribeVideoApiResponseSchema,
  transcribeVideoApiResponseType,
} from "./useTranscribeVideo.types";

const useTranscribeVideo = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setProgress, resetProgress } = useProgressStore();
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const mutation = useMutation({
    mutationKey: ["transcribeVideo"],
    mutationFn: async ({
      language,
      file,
      transcripitonName,
    }: {
      language: "urdu" | "english";
      file: File;
      transcripitonName: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);
      formData.append("transcripitonName", transcripitonName);

      cancelTokenSource.current = axios.CancelToken.source();

      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          if (total) {
            const percent = Math.floor((loaded * 100) / total);
            setProgress(percent > 50 ? percent - 1 : percent);
          }
        },
        cancelToken: cancelTokenSource.current.token,
      };

      const response = await axiosPrivate.post<transcribeVideoApiResponseType>(
        transcribeSttVideo,
        formData,
        options,
      );

      if (import.meta.env.DEV) {
        setProgress(100);
        return getSafeParsedDataAndLogIfError(
          transcribeVideoApiResponseSchema.safeParse(response.data),
        );
      }

      return response.data;
    },
    onSettled: () => {
      resetProgress();
      cancelTokenSource.current = null;
    },
  });

  return {
    ...mutation,
    cancelToken: () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Request canceled by the user.");
      }
    },
  };
};

export default useTranscribeVideo;
