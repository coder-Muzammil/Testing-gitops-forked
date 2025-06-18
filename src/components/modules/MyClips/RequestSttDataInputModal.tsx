import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import DropdownSingleSelect, {
  DropdownSingleSelectOptionsType,
} from "../../primitives/DropdownSingleSelect";
import { MutableRefObject, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import useRequestSttVideo from "../../../api/useRequestSttVideo";
import CircularLoader from "../../uiComponents/CircularLoader";
import axios from "axios";
const RequestSttDataInputModal = ({
  clipPath,
  transcriptionName,
  setIsRequestSttModalOpen,
}: {
  clipPath: string;
  transcriptionName: string;
  setIsRequestSttModalOpen: (value: boolean) => void;
}) => {
  const ref = useClickAway(() => {
    setIsRequestSttModalOpen(false);
  });

  const [select, setSelect] = useState<DropdownSingleSelectOptionsType>({
    label: "Urdu",
    value: "urdu",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  function handleSetLanguage(selectedOption: DropdownSingleSelectOptionsType) {
    setSelect(selectedOption);
  }
  const {
    mutate: transcribeVideo,
    isPending,
    isError,
    error,
  } = useRequestSttVideo();

  const navigate = useNavigate();
  function handleTranscribe() {
    if (select?.value === "urdu" || select?.value === "english") {
      setIsProcessing(true);
      transcribeVideo(
        {
          language: select.value,
          transcriptionName: transcriptionName,
          clipPath: clipPath,
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
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div
        className="flex h-2/3 w-1/3 flex-col gap-3  rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        <div className="flex h-full items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700">
          <div className="w-1/3 space-y-4">
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
                  e.preventDefault();
                  handleTranscribe();
                }}
              >
                {isPending && isProcessing ? <CircularLoader /> : "Transcribe"}
              </ButtonGradientPrimary>
            </div>
            {error && <div className="text-red-500">{errMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSttDataInputModal;
