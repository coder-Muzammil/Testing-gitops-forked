import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSttLiveContext } from "./useSttLiveContext";

type ContentType = "stt" | "topicModeling";

function SttTopModelingSwitch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedTranscriptions, setSelectedTopics } = useSttLiveContext();

  function handleSetContentType(newContentType: ContentType) {
    setSearchParams((currentParams) => {
      if (newContentType === "stt") {
        currentParams.delete("contentType");
        return currentParams;
      }

      currentParams.set("contentType", newContentType);

      return currentParams;
    });

    unSelectPreviouslySelectedContent(newContentType);
  }

  function unSelectPreviouslySelectedContent(newContentType: ContentType) {
    if (newContentType === "stt") {
      setSelectedTopics([]);
    } else {
      setSelectedTranscriptions([]);
    }
  }

  const selectedContentType = searchParams.get("contentType") ?? "stt";

  return (
    <div className="flex w-full items-center justify-center " role="group">
      <div
        className="flex w-full flex-row items-center justify-center"
        role="group"
      >
        <button
          type="button"
          onClick={() => {
            handleSetContentType("stt");
          }}
          className={twMerge(
            "flex-1 rounded-l-lg border border-gray-200 bg-white  text-sm font-medium text-gray-900 transition-all dark:bg-gray-400 ",
            selectedContentType === "stt" && "bg-gray-200 dark:bg-gray-300",
            "w-full ",
            "text-md h-8 px-2 md:h-10 md:px-4 md:text-sm",
          )}
        >
          STT
        </button>
        <button
          type="button"
          onClick={() => {
            handleSetContentType("topicModeling");
          }}
          className={twMerge(
            "flex-1 rounded-r-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 transition-all dark:bg-gray-600",
            selectedContentType === "topicModeling" &&
              "bg-gray-200 dark:bg-gray-300",
            "w-full",
            "md:text-small text-md h-8 px-2 md:h-10 md:px-4",
          )}
        >
          Topic Modeling
        </button>
      </div>
    </div>
  );
}
export default SttTopModelingSwitch;
