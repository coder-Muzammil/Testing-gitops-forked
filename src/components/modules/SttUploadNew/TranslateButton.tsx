import { GetTranscribedVideoDataApiResponseType } from "../../../api/useGetTranscribedVideoData.types";
import useTranslateSttChunks from "../../../api/useTranslateSttChunks";
import toast from "react-hot-toast";
import useSttUploadContext from "./useSttUploadContext";

const TranslateButton = ({
  data,
}: {
  data: GetTranscribedVideoDataApiResponseType;
}) => {
  const {
    selectedChunksForTranslation,
    setSelectedChunksForTranslation,
    setIsTranscribing,
  } = useSttUploadContext();
  const { mutate: translateChunks, isPending } = useTranslateSttChunks();
  const videoId = data.video.id;
  const handleTranslation = () => {
    setIsTranscribing(true);
    translateChunks(
      { selectedChunks: selectedChunksForTranslation, videoId: videoId },
      {
        onSuccess() {
          toast.success("Translate Successfully");
          setSelectedChunksForTranslation([]);
          setIsTranscribing(false);
        },
      },
    );
  };
  const transcribeButtonOn =
    selectedChunksForTranslation.length > 0 ? true : false;
  return (
    <div>
      <button
        className="cursor-pointer rounded-lg bg-lavender-600 px-3 py-1 text-white"
        onClick={handleTranslation}
        disabled={isPending}
      >
        {isPending
          ? "Translating..."
          : transcribeButtonOn
            ? "Translate Chunks"
            : "Translate All"}
      </button>
    </div>
  );
};

export default TranslateButton;
