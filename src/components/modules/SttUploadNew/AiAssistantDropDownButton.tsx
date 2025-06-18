import { useClickAway } from "@uidotdev/usehooks";
import { MutableRefObject, useState } from "react";

const AiAssistantDropDownButton = () => {
  const [isDownloadButtonsDropdownOpen, setIsDownloadButtonsDropdownOpen] =
    useState(false);
  const ref = useClickAway(() => {
    setIsDownloadButtonsDropdownOpen(false);
  });
  return (
    <div
      className="relative z-10 flex items-center gap-2"
      ref={ref as MutableRefObject<HTMLDivElement>}
    >
      <button
        onClick={() => {
          setIsDownloadButtonsDropdownOpen(!isDownloadButtonsDropdownOpen);
        }}
        className="flex w-[170px] items-center justify-center gap-2 rounded-md bg-lavender-600 px-2 py-1 text-white"
      >
        AI Assistant
      </button>
      {isDownloadButtonsDropdownOpen && (
        <div className=" absolute -mb-[250px] flex w-[520px]  flex-col items-center justify-center gap-2 rounded-md bg-lavender-300 p-2  ">
          <p className=" w-full cursor-pointer border-b-[1px] border-gray-300  text-left hover:bg-gray-300">
            Top Trend Analysis
          </p>
          <p className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300">
            Text Summarization
          </p>
          <p className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300">
            Topic Extraction
          </p>

          <p className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300">
            Sentiment Analysis
          </p>
          <p className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300">
            Key insights Generation
          </p>
          <p className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300">
            Channel wise order
          </p>
        </div>
      )}
    </div>
  );
};

export default AiAssistantDropDownButton;
