import Input from "../../primitives/Input";
import { useRef, useState } from "react";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import DropdownSingleSelect, {
  DropdownSingleSelectOptionsType,
} from "../../primitives/DropdownSingleSelect";
import useTranscribeVideo from "../../../api/useTranscribeVideo";
import { useNavigate } from "react-router-dom";
import VideoComponent from "./VideoComponent";
import UploadProgressPortal from "../SttUpload/UploadProgressPortal";
import toast from "react-hot-toast";
import axios from "axios";

function ProcessTranscriptionPhase({
  file,
  removeFile,
}: {
  file: File;
  removeFile: () => void;
}) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [select, setSelect] = useState<DropdownSingleSelectOptionsType>({
    label: "Urdu",
    value: "urdu",
  });

  const {
    mutate: transcribeVideo,
    isPending,
    isError,
    error,
    cancelToken,
  } = useTranscribeVideo();

  const navigate = useNavigate();

  function handleSetLanguage(selectedOption: DropdownSingleSelectOptionsType) {
    setSelect(selectedOption);
  }

  const [isProcessing, setIsProcessing] = useState(false);

  function handleTranscribe() {
    const transcriptionName = inputFieldRef.current?.value;
    if (!transcriptionName || transcriptionName.trim() === "") {
      toast.error("Name is required");
      return;
    }

    if (select?.value === "urdu" || select?.value === "english") {
      setIsProcessing(true);
      transcribeVideo(
        {
          language: select.value,
          file,
          transcripitonName: transcriptionName,
        },
        {
          onSuccess: (data) => {
            navigate(`/stt/uploads/${String(data.id)}`);
          },
        },
      );
    }
  }

  let errMessage = "";

  if (isError && axios.isAxiosError<{ error: string }>(error)) {
    errMessage = error.response?.data.error ?? error.message;
  }

  return (
    <div className="relative">
      <div className="grid h-fit w-full grid-cols-2 gap-4">
        <VideoComponent file={file} removeFile={removeFile} />
        <div className="flex items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800">
          <div className="w-1/3 space-y-4">
            <Input
              ref={inputFieldRef}
              name="name"
              type="text"
              placeholder="Provide name"
              required
            />
            <div className="grid">
              <DropdownSingleSelect
                placeholderText="Select Language"
                entries={[
                  { label: "English", value: "english" },
                  { label: "Urdu", value: "urdu" },
                ]}
                selectedOption={select}
                handleSetOption={handleSetLanguage}
              />
            </div>

            <div>
              <ButtonGradientPrimary
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                isInvalid={isError}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission behavior
                  handleTranscribe(); // Call handleTranscribe directly
                }}
              >
                Transcribe
              </ButtonGradientPrimary>
            </div>
            {error && <div className="text-red-500">{errMessage}</div>}
          </div>
        </div>
      </div>
      {isPending && isProcessing && (
        <div className="absolute left-0 top-0 h-full w-full bg-gray-100/90 text-white">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-20 w-20">
              <UploadProgressPortal
                selectedFile={file}
                onCancel={cancelToken}
                setIsProcessing={setIsProcessing}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcessTranscriptionPhase;
