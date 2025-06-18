import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type ContentType = "stt" | "sttUploads";

function SttUploadTranscriptionSwitch() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSetContentType(newContentType: ContentType) {
    setSearchParams((currentParams) => {
      if (newContentType === "stt") {
        currentParams.delete("contentType");
        return currentParams;
      }

      currentParams.set("contentType", newContentType);

      return currentParams;
    });
  }
  const selectedContentType = searchParams.get("contentType") ?? "stt";

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex w-1/2 rounded-md  " role="group">
        <button
          type="button"
          onClick={() => {
            handleSetContentType("stt");
          }}
          className={twMerge(
            "h-8 flex-1 rounded-s-lg border border-gray-200 border-e-gray-300 bg-white px-4 text-sm font-medium text-gray-900",
            selectedContentType === "stt" ? "bg-gray-200" : "",
          )}
        >
          Live Transcriptions
        </button>
        <button
          type="button"
          onClick={() => {
            handleSetContentType("sttUploads");
          }}
          className={twMerge(
            "h-8 flex-1 rounded-e-lg border border-gray-200 border-s-gray-300 bg-white px-4 text-sm font-medium text-gray-900",
            selectedContentType === "sttUploads" ? "bg-gray-200" : "",
          )}
        >
          STT Upload Records
        </button>
      </div>
    </div>
  );
}
export default SttUploadTranscriptionSwitch;
