import { type Dispatch, type SetStateAction, useState } from "react";
import useTranscribeVideo from "../../../api/useTranscribeVideo";
import UploadProgressPortal from "./UploadProgressPortal";
import SttUploadForm from "./SttUploadForm";
import SttVideoPlayer from "./SttVideoPlayer";
import { useNavigate } from "react-router-dom";
type TranscribeSttProps = {
  selectedFile: File;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
};

const TranscribeStt = ({
  selectedFile,
  setUploadedFile,
}: TranscribeSttProps) => {
  const {
    mutate: sendForStt,
    isPending,
    isError,
    error,
    isSuccess,
    cancelToken,
  } = useTranscribeVideo();
  const [selectedEntry, setSelectedEntry] = useState<"urdu" | "english">(
    "urdu",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcripitonName, setTranscripitonName] = useState<string>("");
  const [filedError, setFieldError] = useState<string>("");
  const navigate = useNavigate();
  const handleCancelVideo = () => {
    setUploadedFile(null);
  };

  const handleTranscribe = () => {
    if (!transcripitonName) {
      setFieldError("Name is required");
      setTimeout(() => {
        setFieldError("");
      }, 4000);
      return;
    }
    setIsProcessing(true);
    sendForStt(
      {
        language: selectedEntry,
        file: selectedFile,
        transcripitonName: transcripitonName,
      },
      {
        onSuccess: (data) => {
          const { id } = data;
          setIsProcessing(false);
          setTranscripitonName("");
          navigate(`/stt/Uploads/${String(id)}`);
        },
      },
    );
  };
  return (
    <>
      {isPending && isProcessing && (
        <UploadProgressPortal
          selectedFile={selectedFile}
          onCancel={cancelToken}
          setIsProcessing={setIsProcessing}
        />
      )}

      <div className="grid h-full w-full grid-cols-2 gap-3 ">
        <div className="grid grid-rows-[1fr_1fr]">
          <SttVideoPlayer
            onCancelVideo={handleCancelVideo}
            isSuccess={isSuccess}
            selectedFile={selectedFile}
          />
          <div className="bg-gray-100">
            <p className="p-4 text-left text-3xl font-semibold">
              Imran Khan UN Speech
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div>fdafasf</div>
        ) : (
          <SttUploadForm
            value={transcripitonName}
            setValue={setTranscripitonName}
            filedError={filedError}
            selectedEntry={selectedEntry}
            setSelectedEntry={setSelectedEntry}
            isPending={isPending}
            onClick={handleTranscribe}
          />
        )}
        {isError && (
          <p className="col-span-2 text-center text-red-400">{error.message}</p>
        )}
      </div>
    </>
  );
};

export default TranscribeStt;
